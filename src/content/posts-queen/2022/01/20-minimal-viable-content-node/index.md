---
title: Minimal Viable Content Node
emojii: 🥗 🌮
tags: data layer, sourceNodes,createNode, createNodeId
---

Are you the type who preps all your ingredients in advance of cooking? No?

Sourcing content into the Gatsby Data Layer as content nodes is a little like shopping for ingredients! Chopping up and prepping those ingredients is similar to transforming those sourced content nodes to be ready to go.

If you are the prep type, you might have taken quickly to the Gatsby Data Layer; if you are not, maybe you feel it's an unnecessary step keeping you from making it up while you go and moving quickly?

Either way, if you are going to get the most out of Gatsby, you should probably become intimately familiar with it.

On that note, Ola and I had an interesting conversation last week:

> How minimal can a content node be?

It turns out it can be very minimal!

```js
// gatsby-node.js

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  const ID = `unique`;

  createNode({
    id: createNodeId(`minimal-content-node-${ID}`),
    internal: {
      type: `Minimal`,
      contentDigest: createContentDigest(ID),
    },
  });
};
```

A content node of type `Minimal` is now available in the Gatsby Data Layer and can be queried for like so:

```
query MinimalQuery {
  minimal {
    internal {
      type
    }
    id
  }
}
```

Resulting in:

```json
{
  "data": {
    "minimal": {
      "internal": {
        "type": "Minimal"
      },
      "id": "40c03aa4-b334-5ec8-a148-8f42e7bafbb4"
    }
  },
  "extensions": {}
}
```

Obviously not usable for anything, but in tonight's [unauthorized and rum-fueled treasure hunt](https://www.youtube.com/watch?v=VhrOe0X_oA8) Deep Dive Edition, we'll build from here and create `YouTube` content nodes containing the embed code and thumbnail fetched from YouTube.

&nbsp;  
Have you ever created your own content nodes?  
Let me know!

&nbsp;  
All the best,  
Queen Raae

&nbsp;  
**PS:** You might feel you have seen this [particualar Deep Dive before](https://youtu.be/tJHV96jVlKg), but this time we'll move slower, and we'll not need a YouTube API Key 🤯
