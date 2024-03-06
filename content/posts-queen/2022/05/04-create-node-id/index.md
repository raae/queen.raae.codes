---
title: How to create unique Gatsby node ids
emojii: 🏷 ✨
tags: sourceNodes, createNode, createNodeId, Data Layer, Gatsby Source Plugin
---

All Gatsby nodes need a unique id. Luckily for you, a Gatsby Source Plugin developer, you are not responsible for creating unique ids. You are only responsible for supplying a unique-within-your-universe-id to `createNodeId`. Gatsby is responsible for returning a unique node id.

```js
exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { createNode } = actions;

  createNode({
    id: createNodeId("unique-within-your-universe-id"),

    // More fields
  });
};
```

In [Gatsby Source YouTube oEmbed](https://github.com/queen-raae/gatsby-source-youtube-oembed/blob/812494ccc6d1daf74bf9de4e04ee9aa87e887f90/plugin/gatsby-node.js#L57) we use the YouTube id. It is unique across the YouTube universe.

&nbsp;  
All the best,  
Queen Raae

&nbsp;  
**PS:** `createNodeId` [is deterministic](/posts/2022-03-30-deterministic/)
