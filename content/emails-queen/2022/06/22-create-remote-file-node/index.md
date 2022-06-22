---
title: createRemoteFileNode does return something useful
emojii: 📥 🎉
tags: createRemoteFileNode, createParentChildLink, onCreateNode
---

`createRemoteFileNode` does not return something useful, as [opposed to createNode](/emails/2022-06-21-create-node/):

```js
// gatsby-node.js
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.sourceNodes = async (gatsbyUtils) => {
  const { actions, createNodeId, createContentDigest, getCache } = gatsbyUtils;
  const { createNode } = actions;

  const awaitedNode = await createRemoteFileNode({
    url: `https://images.unsplash.com/photo-1638913658179-18c9a9c943f7`,
    getCache,
    createNode,
    createNodeId,
  });
  console.log(">>>> awaitedNode:", awaitedNode); // 👈
  // Console:
  // >>>> awaitedNode: {
  // id: '48891c31-1e53-502d-a55f-d4b136548a1d',
  // children: [],
  // parent: null,
  // internal: {
  //   contentDigest: '5554be7feae0cf9706e0b75765f113af',
  //   type: 'File',
  //   mediaType: 'image/jpeg',
  //   description: 'File "https://images.unsplash.com/photo-1638913658179-18c9a9c943f7"',
  //   owner: 'gatsby-source-filesystem'
  // },
  // sourceInstanceName: '__PROGRAMMATIC__',
  // relativePath: '.cache/caches/gatsby-source-filesystem/7651f71dfabb002e14bde839cb444791/photo-1638913658179-18c9a9c943f7.jpg',
  // ... lots more
  // url: 'https://images.unsplash.com/photo-1638913658179-18c9a9c943f7'
}
};
```

Therefore you can use the returned data to create a child-parent link in `onCreateNode`, for instance:

```js
// gatsby-node.js
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.onCreateNode = async (gatsbyUtils) => {
  const { node, actions, createNodeId, getCache } = gatsbyUtils;
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type !== "Parent") return;

  const childFileNode = await createRemoteFileNode({
    url: node.coverUrl, // or any field that is a file url
    getCache,
    createNode,
    createNodeId,
  });

  // 👇👇👇
  createParentChildLink({ parent: node, child: childFileNode });
};
```

&nbsp;

All the best,  
Queen Raae
