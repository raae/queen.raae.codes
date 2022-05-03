---
title: No need to create the content digest yourself
emojii: 📄 🏷
tags: sourceNodes, createNode, createContentDigest, Data Layer
---

We see a lot of this type of code when looking at source plugins:

```js
exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;
  const data = { hello: "world" };

  createNode({
    // More fields
    internal: {
      // More fields
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(data))
        .digest(`hex`),
    },
  });
};
```

It is not technically wrong, but I prefer using `createContentDigest` like so:

```js
exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions;
  const data = { hello: "world" };

  createNode({
    // More fields
    internal: {
      // More fields
      contentDigest: createContentDigest(data), // 👈👈👈
    },
  });
};
```

`internal.contentDigest` is mandatory and thus part of a [Minimal Viable Content Node](/emails/2022-01-20-minimal-viable-content-node/). If this value has not changed, Gatsby uses the cached node instead of creating a new node, and for instance, `onCreateNode` is not called.

> **contentDigest:** the digest for the content of this node. Helps Gatsby avoid doing extra work on data that hasn’t changed.
> <cite>[Gatsby Docs](https://www.gatsbyjs.com/docs/reference/config-files/actions/#createNode)</cite>

&nbsp;  
All the best,  
Queen Raae
