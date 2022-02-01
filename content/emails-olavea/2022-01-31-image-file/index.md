---
title: I created an imageFile with createRemoteFileNode
---

![imageFile](imageFile-1.jpeg)

## My Sunday Skill Builder Session:

This Sunday, I created an imageFile with createRemoteFileNode

## What did I do?

I created an imageFile to use inside my node

## Why did I do it?

I wanted to use som Gatsby Image trickery on the thumbnail in our youtube data 💪😺. Therefore I downloaded the thumbnail into my data layer. At least that is how I see it.

## How did I do it ?

### Short version:

```js
// POW!-website plugins / local - source - youtube / gatsby - node.js;
const { createRemoteFileNode } = require("gatsby-source-filesystem");

const youTubeNodeId = createNodeId(`you-tube-${id}`);

const imageFile = await createRemoteFileNode({
  url: embedData.thumbnail_url,
  parentNodeId: youTubeNodeId,
  getCache,
  createNode,
  createNodeId,
});
```

And then I use my imageFile inside my node like this.

```js
createNode({
  thumnail___NODE: imageFile.id,
});
```

### Longer version:

[Sunday's OlaCast on YouTube](https://youtu.be/LQ2DRJbG8FY)

💪😺👍

Keep your skill-builder-ship afloat this week!

🔧⛵🏴‍☠️

Ola Vea
Cap'n of his own skill-builder-ship
