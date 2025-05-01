---
title: How to use JWT from any auth provider with Supabase RLS
tags: JWT, RLS, Auth, Authorization
brands: Outseta, Supabase
projects: Feedback Fort
---

Supabase provides Row Level Security (RLS) as a way to control access to your data. RLS makes it possible to query data from your client without an API layer. But what if you want to use your existing authentication system, instead of Supabase Auth?

This is something our [Outseta](https://outseta.com/?via=queen&utm_source=queen&utm_medium=blog&utm_campaign=supabase-exchange) users struggled with. I was pretty sure it was possible, but it took me some time to come up with the solution. I realised it could be used with any JWT-based auth provider, so I thought I'd share the solution here as well.

<aside class="notice">

I've also created a full [React + Supabase + Outseta demo app](https://outseta-supabase-react-feedback-fort.netlify.app/) that you can use as a starting point for your own project. Full source code is available on [GitHub](https://github.com/outseta/outseta-supabase-react-feedback-fort).

</aside>

## The Problem

You have an existing authentication system that issues JWTs, but you want to leverage Supabase's Row Level Security (RLS) features that expect Supabase-signed tokens.

## The Solution

Exchange your authentication provider's JWT for a Supabase-signed JWT, then use the latter for all Supabase operations.

## How It Works

The token exchange must happen server-side and follows these steps:

1. **Verify the original JWT** using your auth provider's public key or JWKS endpoint
2. **Create a new JWT** with additional claims required by Supabase
3. **Sign the new JWT** with your Supabase JWT Secret
4. **Use the Supabase-signed JWT** in subsequent requests

## Implementation Steps

### 1. Set Up Your Authentication Provider

And take note of the shape for the JWT payload they provide, typical it will include things like:

- `sub`: The unique ID of the authenticated user
- `email`: User's email address
- `name`: User's name
- `org_id`: User's organisation ID

For an example, check out the [Outseta JWT docs](https://go.outseta.com/support/kb/articles/XQYMXqQP/the-jwt-access-token).

### 2. Create an Exchange Function

Deploy a server-side function that handles the token exchange. This can be:

- A Supabase Edge Function
- An API route in your application server
- A serverless function somewhere

We'll use a Supabase Edge Function for this example, but the same principles apply to any server-side function.

You'll need the following environment variables for the Edge Function (found in Supabase Console under Edge Functions -> Secrets):

- `SUPABASE_JWT_SECRET`: Your Supabase JWT secret (found in the Supabase Console under Project Settings -> Data API)
- `AUTH_JWKS_URL`: The JWKS URL for your auth provider (found in the auth provider's docs)
  - or `AUTH_PUBLIC_KEY`: The public key for your auth provider (found in the auth provider's docs)

To deploy the function, run:

```bash
supabase functions deploy exchange --no-verify-jwt
```

or upload the function from the Supabase Console making sure to disable the "Enforce JWT Verification" option.

The `--no-verify-jwt` flag is essential because this endpoint is requested with the JWTs from your external auth provider, not a Supabase-signed tokens. Without this flag, Supabase would automatically reject these requests as it would try to verify them as Supabase JWTs.

Here's a sample exchange function using Supabase Edge Functions:

```typescript
// File: /functions/exchange/index.ts
// Deploy with: supabase functions deploy exchange --no-verify-jwt

import * as jose from "https://deno.land/x/jose@v4.14.4/index.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Get the original JWT from the Authorization header
  const authHeader = req.headers.get("Authorization");
  const originalJwt = authHeader?.split(" ")[1] || "";

  try {
    // OPTION 1: Verify with JWKS URL
    const JWKS = jose.createRemoteJWKSet(new URL(Deno.env.get("AUTH_JWKS_URL")));

    // OPTION 2: Verify with public key
    // const publicKey = await jose.importSPKI(Deno.env.get("AUTH_PUBLIC_KEY"), "RS256");

    // Verify the token
    const { payload } = await jose.jwtVerify(originalJwt, JWKS);

    // Add the required role claim if not already present for a valid Supabase JWT
    payload.role = "authenticated"; // Required by Supabase

    // Add or modify any other claims you need for RLS policies
    // payload.some_claim = "some claim";

    // Sign with Supabase JWT secret
    const supabaseSecret = new TextEncoder().encode(Deno.env.get("SUPABASE_JWT_SECRET"));

    const supabaseJwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuer("supabase")
      .setIssuedAt(payload.iat)
      .setExpirationTime(payload.exp || "")
      .sign(supabaseSecret);

    // Return the Supabase JWT
    return new Response(JSON.stringify({ supabaseJwt }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 401,
    });
  }
});
```

### 3. Use the Exchanged JWT with Supabase Client

The most elegant way to use the exchanged JWT is to configure the Supabase client with a custom accessToken handler that automatically exchanges tokens:

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client with automatic token exchange
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  accessToken: async (fallbackToken) => {
    // Get the original JWT from your auth provider
    const originalJwt = getAuthProviderToken(); // Replace with your auth provider's method

    if (!originalJwt) {
      return null; // No token available
    }

    // Exchange it for a Supabase token
    const supabaseJwt = await exchangeToken(originalJwt);
    return supabaseJwt || fallbackToken;
  },
});

// Function to exchange the original JWT for a Supabase JWT
async function exchangeToken(originalJwt) {
  // Perhaps add some caching here to avoid unnecessary exchanges,
  // only need to exchange if originalJwt has changed
  try {
    console.log("Exchanging token for Supabase access");
    const response = await fetch(`${supabaseUrl}/functions/v1/exchange`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${originalJwt}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.status}`);
    }

    const { supabaseJwt } = await response.json();
    return supabaseJwt;
  } catch (error) {
    console.error("Error exchanging token:", error);
    return null;
  }
}

// Example usage - just use the supabase client normally!
// The token exchange happens automatically behind the scenes
const { data, error } = await supabase.from("my_table").select("*");
```

## Creating RLS Policies with the Exchanged JWT

Supabase makes the decoded JWT available in RLS policies through the built-in `auth.jwt()` function:

```sql
-- Example: Only allow users to read their own records
CREATE POLICY "Users can read their own data" ON my_table
  FOR SELECT
  -- Using auth.jwt() ->> 'sub'instead of auth.uid() as you could with Supabase auth
  USING (auth.jwt() ->> 'sub' = user_id);

-- Example: Organization-based access if you have an org_id claim
CREATE POLICY "Users can access organization data" ON org_resources
  FOR ALL
  USING (auth.jwt() ->> 'org_id' = organization_id);
```

## Setting Default Values from JWT Claims

You can also use JWT claims as default values for table columns:

```sql
-- Example: Automatically set the user_id when a record is created
ALTER TABLE my_table
  ALTER COLUMN user_id SET DEFAULT auth.jwt() ->> 'sub';

-- Example: Set organization_id from JWT claim
ALTER TABLE org_resources
  ALTER COLUMN organization_id SET DEFAULT auth.jwt() ->> 'org_id';
```

## Important Considerations

1. **Security**: Always verify the original JWT on the server side before exchanging it
2. **Claims Mapping**: Transfer all relevant claims from the original JWT to the Supabase JWT
3. **Expiration**: Preserve the original token's expiration time in the Supabase token
4. **Error Handling**: Handle verification failures gracefully

## Conclusion

By implementing this token exchange pattern, you can continue using your existing authentication system while taking full advantage of Supabase's powerful RLS capabilities. This approach gives you the flexibility to use any JWT-based auth provider that does not have a built-in Supabase integration, such as [Outseta](https://outseta.com/?via=queen&utm_source=queen&utm_medium=blog&utm_campaign=supabase-exchange).

Happy building! 🚀
