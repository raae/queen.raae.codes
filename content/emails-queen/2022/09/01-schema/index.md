---
title: Add a schema to avoid GraphQL cannot query errors
emojii: 🧱 🗂
tags: createSchema
---

In yesterday's email, we solved the

```
Cannot query field "allUserAvatar" on type "Query"
```

issue by [stopping the build](/emails/2022-08-31-panic/) if no data is sourced.

However, you often want to allow empty data queries. Maybe the blog posts are not written yet, or there are no images for the gallery yet.

In that case, defining the expected schema will help.

```js
// File: gatsby-node.js

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type UserAvatar implements Node {
      username: String!
      avatarUrl: String!
    }
  `;
  createTypes(typeDefs);
};
```

The GraphQL queries will longer fail 💪

When choosing this solution, you should remember to account for missing data in your components. It could be as simple as returning nothing when no data is available:

```js
if (data.allUserAvatar.nodes.length === 0) return null;
```

See the code changes made to [Prune your follows on Github](https://github.com/queen-raae/prune-your-follows/commit/a1f88b8e667b60d28bb12475bde4475335968525) to allow for empty avatar data.

&nbsp;

All the best,  
Queen Raae

&nbsp;

PS: I spy with my little eye [something beginning with 5...and ends in alpha...](https://twitter.com/raae/status/1565226034613592067)
