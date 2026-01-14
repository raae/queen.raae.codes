---
title: Should we skip the Gatsby Cache altogether?
emojii: 🛑 🔄
tags: gatsby-source-youtube-oembed, gatsby cache, createNodeId, gatsby-node.js
---

Acknowledging the [deterministic nature of `createNodeId`](/2022-03-30-deterministic/) simplified our Gatsby Source YouTube oEmbed Plugin a smidge, resulting in:

```js
const youTubeNodeId = createNodeId(`YouTube >>> ${youTubeId}`);
const timestamp = await cache.get(youTubeNodeId);
const existingNode = getNode(youTubeNodeId);
const existingNodeAge = Date.now() - timestamp;

if (existingNode && existingNodeAge <= refreshInterval) {
  // Node already exists, make sure it stays around
  touchNode(existingNode);
  reporter.info(`Touch YouTube Node for ${youTubeId}`);
} else {
  // Fetch oEmbed data and create node
  const embedData = await fetchEmbed(youTubeId);

  createNode({
    id: youTubeNodeId,
    youTubeId: youTubeId,
    oEmbed: embedData,
    internal: {
      type: "YouTube",
      contentDigest: createContentDigest(embedData),
    },
  });

  await cache.set(youTubeNodeId, `${Date.now()}`);
  reporter.info(`Create YouTube Node for ${youTubeId}`);
}
```

When doing so, another thought came to mind: Could we skip using the cache altogether?

**It seems like we can, but should we?**

```js
const youTubeNodeId = createNodeId(`YouTube >>> ${youTubeId}`);
const existingNode = getNode(youTubeNodeId);
const existingNodeAge = Date.now() - existingNode?.timestamp;

if (existingNode && existingNodeAge <= refreshInterval) {
  // Node already exists, make sure it stays around
  touchNode(existingNode);
  reporter.info(`Touch YouTube Node for ${youTubeId}`);
} else {
  // Fetch oEmbed data and create node
  const embedData = await fetchEmbed(youTubeId);

  createNode({
    id: youTubeNodeId,
    youTubeId: youTubeId,
    oEmbed: embedData,
    timestamp: Date.now(),
    internal: {
      type: "YouTube",
      contentDigest: createContentDigest(embedData),
    },
  });

  reporter.info(`Create YouTube Node for ${youTubeId}`);
}
```

Take a look at the [Pull Request](https://github.com/queen-raae/gatsby-source-youtube-oembed/pull/9/files) and let me know what you think!  
Leave a comment on the PR or reply to this email.

&nbsp;  
All the best,  
Queen Raae

&nbsp;  
**PS:** If you have any other thoughts or opinions on the plugin's code, I would love to hear them 🤩
