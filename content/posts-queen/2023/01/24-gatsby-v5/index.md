---
title: My upgrade from Gatsby v4 to v5
---

As soon as v5 was released, I tried upgrading but quickly put it on the shelf as I use [`node-canvas`](https://github.com/Automattic/node-canvas) to draw the open graph images. And back in November, `node-canvas` did not have Node v18 support!

But now it does, and the upgrade was pretty swift for me 🥳

I ran the `gatsby-codemods` to fix [GraphQL schema: Changes to sort and aggregation fields](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/#graphql-schema-changes-to-sort-and-aggregation-fields).

```bash
npx gatsby-codemods@latest sort-and-aggr-graphql .
```

Then I also had to refactor from `nodeModel.runQuery` to `nodeModel.getAllNodes` in my "find related content" resolver inspired by [How to Create List of Related Content in Gatsby.JS](https://reckoning.dev/blog/related-posts-gatsbyjs/).

&nbsp;

All the best,\
Queen Raae

&nbsp;

**PS:** Skipping tomorrow as it's the Pirate Princess's birthday.
