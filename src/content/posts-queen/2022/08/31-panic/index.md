---
title: Stop the build with `reporter.panic`
emojii: ⛔️ 🏗
tags: Gatsby Reporter, Gatsby
---

On last week's show, we [sourced data from Supabase](/2022-08-26-source-supabase/) in the form of little avatars.

If the sourcing fails though, we'll get problems down the road with the `Avatars` component:

```
Cannot query field "allUserAvatar" on type "Query"
```

It would be better to fail as fast as possible, and you may do so with `reporter.panic`.

```js
// File: gatsby-node.js

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.GATSBY_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const serviceSupabase = createClient(supabaseUrl, supabaseServiceKey);

exports.sourceNodes = async (gatsbyUtils) => {
  const { actions, createNodeId, createContentDigest, reporter } = gatsbyUtils;
  const { createNode } = actions;

  const { data, error } = await serviceSupabase
    .from("avatars")
    .select("username, avatar_url")
    .limit(20);

  if (error) {
    // 👇👇👇 Stops the build
    reporter.panic("No avatars sourced", error);
  }

  data.forEach((item) => {
    createNode({
      id: createNodeId(item.username),
      avatarUrl: item.avatar_url,
      username: item.username,
      internal: {
        type: "UserAvatar",
        contentDigest: createContentDigest(item),
      },
    });
  });
};
```

Read more about the `reporter` helper [in the Gatsby Docs](https://www.gatsbyjs.com/docs/reference/config-files/node-api-helpers/#reporter).

&nbsp;  
All the best,  
Queen Raae
