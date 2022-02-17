---
title: Source remote images the right way with Gatsby v4
emojii: 🖼 📥
---

Gatsby v4 has been out for a while, and with v4 came a much stricter approach to creating and modifying nodes.

However there seems to be quite a bit of outdated documentation, as I experienced when looking into `createResolvers`.

An examples shows [creating remote file nodes](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#feeding-remote-images-into-gatsby-image) as part of a custom resolver. It worked for me locally but failed on Gatsby Cloud, and I found out it is no longer supported.

There are also examples using the [`___NODE Convention` for linking nodes](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/#___node-convention) that will be deprecated in v5.

In Gatsby Version 4:

- [All node creation and mutation need to happen during `sourceNodes` or `onCreateNode`](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-source-plugin-from-v3-to-v4/#2-data-mutations-need-to-happen-during-sourcenodes-or-oncreatenode)
- [Mutation is only allowed using the action `createNodeField`](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/#dont-mutate-nodes-outside-of-expected-apis)

Combined, we get the following recommended way of sourcing remote images:

```js
exports.onCreateNode = async (gatsbyUtils) => {
  const { node, actions, reporter, createNodeId, getCache } = gatsbyUtils;
  const { createNodeField, createNode } = actions;

  if (node.internal.type === `YouTube`) {
    const imageFile = await createRemoteFileNode({
      // The url of the remote file
      url: node.oEmbed.thumbnail_url,
      parentNodeId: node.id,
      getCache,
      createNode,
      createNodeId,
    });

    createNodeField({
      node,
      name: `thumbnailFileId`,
      value: imageFile.id,
    });

    reporter.info(`Created YouTube File Node for ${node.youTubeId} thumbnail`);
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type YouTube implements Node {
      thumbnail: File @link(from: "fields.thumbnailFileId")
    }
  `);
};
```

Example lifted from [@raae/gatsby-source-youtube-oembed](https://github.com/queen-raae/gatsby-source-youtube-oembed/pull/3).

&nbsp;  
All the best,  
Queen Raae
