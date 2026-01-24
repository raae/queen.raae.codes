---
title: Direct mutation of a node is a big no-no
emojii: 🙅‍♀️ 🛠
tags: source plugins, onCreateNode, createNodeField, lifecycle
---

Before Gatsby v4, you could mutate a node directly, and it would work. [According to Gatsby](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/#dont-mutate-nodes-outside-of-expected-apis), it was never an intended feature. The persisted storage for nodes in v4 breaks this unintended pattern.

What do we mean by direct manipulation of a node? Direct manipulation assigns properties to the node like it was a regular JavaScript Object.

For instance, before v4 we could have done:

```js
exports.onCreateNode = async (gatsbyUtils, pluginOptions) => {
  // Code lifted from gatsby-source-youtube-oembed
  // Downloads the thumbnail as a file for YouTube nodes
  // and connects the created file node to the YouTube node
  // via the property thumbnailFileId
  const { node, reporter, createNodeId, getCache } = gatsbyUtils;
  const { createNode } = gatsbyUtils.actions;

  if (node.internal.type === "YouTube") {
    const imageFile = await createRemoteFileNode({
      // The url of the remote file
      url: node.oEmbed.thumbnail_url,
      parentNodeId: node.id,
      getCache,
      createNode,
      createNodeId,
    });

    node.thumbnailFileId = imageFile.id; // 👈👈👈
  }
};
```

However, that will no longer work. `thumbnailFileId` will not be added to the node. If you need to add data after a node is created, you must use `createNodeField` instead.

Exchange

```js
node.thumbnailFileId = imageFile.id;
```

for

```js
createNodeField({
  node,
  name: `thumbnailFileId`,
  value: imageFile.id,
});
```

and you are good to go!

&nbsp;  
All the best,  
Queen Raae
