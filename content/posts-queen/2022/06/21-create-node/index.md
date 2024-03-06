---
title: createNode does NOT return anything useful
emojii: 📥 🏜
tags: createNode, createParentChildLink, onCreateNode, sourceNodes
---

`createNode` does not return anything useful:

```js
// gatsby-node.js

// Should be sourced or derived, only for example purposes
const DATA = { id: "unique", hello: "world" };

exports.sourceNodes = async (gatsbyUtils) => {
  const { actions, createNodeId, createContentDigest } = gatsbyUtils;
  const { createNode } = actions;

  const awaitedNode = await createNode({
    ...DATA,
    id: createNodeId(`example-node-${DATA.id}`),
    internal: {
      type: `BadExample`,
      contentDigest: createContentDigest(DATA),
    },
  });
  console.log(">>>> awaitedNode:", awaitedNode); // 👈
  // Console:
  // >>> awaitedNode: []
};
```

Therefore to create a child-parent link in `onCreateNode` for instance, you need to keep a reference to the id yourself:

```js
// gatsby-node.js

// Should be sourced or derived, only for example purposes
const DATA = { id: "unique", hello: "world" };

exports.onCreateNode = (gatsbyUtils) => {
  const { node, actions, createNodeId, createContentDigest } = gatsbyUtils;
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type !== "Parent") return;

  const nodeId = createNodeId(`example-node-${DATA.id}`); // 👈

  createNode({
    ...DATA,
    id: nodeId, // 👈
    internal: {
      type: `Child`,
      contentDigest: createContentDigest(DATA),
    },
  });

  // 👇👇👇
  createParentChildLink({ parent: node, child: { id: nodeId } });
};
```

A more common version of the code above that you see in examples are:

```js
// gatsby-node.js

// Should be sourced or derived, only for example purposes
const DATA = { id: "unique", hello: "world" };

exports.onCreateNode = (gatsbyUtils) => {
  const { node, actions, createNodeId, createContentDigest } = gatsbyUtils;
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type !== "Parent") return;

  const childNode = {
    ...DATA,
    id: createNodeId(`example-node-${DATA.id}`),
    internal: {
      type: `Child`,
      contentDigest: createContentDigest(DATA),
    },
  };

  // 👇👇👇
  createNode(childNode);
  createParentChildLink({ parent: node, child: childNode });
};
```

However, I'm not too fond of indicating that the data object describing the node is already an _actual_ node in the data layer, so I prefer my initial solution as only the id is needed to create the link.

&nbsp;

All the best,  
Queen Raae
