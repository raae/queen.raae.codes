---
title: Preventing sneaky whitespace-only comments that AI let pass in Supabase
tags: PostgreSQL, RLS, Validation, AI
project: Feedback Fort
brands: Supabase, Claude, Cursor
---

This [week on stream](TODO: add stream link), I paired with Cursor + Claude to add commenting functionality to [Feedback Fort: React + Supabase + Outseta](https://outseta-supabase-react-feedback-fort.netlify.app/).

I teased the stream with "Will it #AI?" a nod to "Will it blend?" of yesteryear.

It felt like the answer was unequivocally yes - Claude seamlessly pumped out the Supabase migration SQL and working React code.

[See me react live on stream here](TODO: add stream link).

Or so I thought...

Testing after the stream revealed that sneaky whitespace-only comments could make it to the database. Turns out, AI is just as prone to the "client-side validation is enough" fallacy.

🤦‍♀️🤦‍♀️🤦‍♀️

## The Claude-generated setup

Here's what our AI pair programmer came up with:

```sql
-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    feedback_uid UUID NOT NULL REFERENCES feedback(uid),
    outseta_person_uid VARCHAR NOT NULL DEFAULT auth.jwt() ->> 'sub',
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create policy to allow users to create comments
CREATE POLICY "Users can create comments"
    ON comments FOR INSERT
    WITH CHECK (auth.jwt() ->> 'sub' = outseta_person_uid);
```

```jsx
const handleSubmit = async (event) => {
  event.preventDefault();

  // Client-side validation courtesy of Claude
  if (!content.trim()) {
    setError("Comments cannot be empty. Please add some text.");
    return;
  }

  // Submit to Supabase
  const { error } = await supabase.from("comments").insert({
    feedback_uid: feedbackUid,
    content,
  });

  if (error) {
    setError(error.message);
    return;
  }
};
```

As you can see the AI made sure the content is `NOT NULL` and even added the `.trim()` check before submitting to Supabase.

## The issue

After stream I took a closer look and realized whitespace-only comments could make it to the database if someone wanted to be sneaky doing something like:

- Direct API calls to Supabase using something like Postman
- Browser console manipulation to skip the validation

or in the future (if this was not merely a demo project) we could have:

- Other front-ends that don't implement the same validation
- A dev removing the validation for some reason
- AI removing the validation while working on another feature

Therfore the general rule of the World Wide Web is to never-ever trust data coming from a client to be correct or valid!

## The Solution

When using Supabase adding a similar "trim" check at the database level is a good place to put your server-side validation.

So I added this constraint to the table:

```sql
ALTER TABLE comments
ADD CONSTRAINT non_empty_content
CHECK (TRIM(BOTH FROM content) <> ''::text);
```

Trying to insert a whitespace-only comment after adding this constraint I got:

```
ERROR: new row for relation "comments" violates check constraint "non_empty_content"
```

Perfect! The database now rejects these problematic comments regardless of where they come from.

If you are working on a new project and want to add this constraint from the start, you may add it as part of your table creation:

```sql
-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL CHECK (TRIM(BOTH FROM content) <> ''::text),
    feedback_uid UUID NOT NULL REFERENCES feedback(uid),
    outseta_person_uid VARCHAR NOT NULL DEFAULT auth.jwt() ->> 'sub',
    deleted_at TIMESTAMP WITH TIME ZONE
);
```

For other tech stacks it might make more sense to do this in an API layer.

## Key Takeaways

- AI generated code is trained on human code, so the same typical mistakes are made!
- Implement validation at every layer, but always on the server side!!!
- `TRIM(BOTH FROM content) <> ''::text` is your friend for text content validation

Let's see if we can get Claude to add the constraint from the start next time, [Monday 26th May at 15:30 CEST](TODO: add stream link).
