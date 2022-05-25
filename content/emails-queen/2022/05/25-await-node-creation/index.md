---
title: Remember to await node creation!
emojii: ⏳ ⌛️
tags: source plugins, sourceNodes, onCreateNode, lifecycle
brands: Cloudinary
---

In [yesterday's email](/emails/2022-05-24-node-creation/) I mentioned you must only create nodes within `sourceNodes` and `onCreateNode`.

A pretty straightforward rule, but sourcing data usually introduces asynchronous code. And with asynchronous code, you can quickly end up in a situation where you create nodes outside `sourceNodes` and `onCreateNode`.

Unfortunately, it still usually works, at least for a few nodes and often in development. However, when you deploy, it falls apart.

When you see inconsistent and weird behavior around node creation, your issue is probably nodes created outside of `sourceNodes` and `onCreateNode`. Or direct manipulation of nodes; the topic for tomorrow's email.

There is an excellent example in [the Gatsby Docs](https://www.gatsbyjs.com/docs/debugging-async-lifecycles/), but here is another one without the use of `.then`:

```js
// gatsby-node.js

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createCloudinaryNodes = async (gatsbyUtils) => {
  const { actions, reporter, createNodeId, createContentDigest } = gatsbyUtils;
  const { createNode } = actions;

  const result = await cloudinary.api.resources({
    resource_type: "image",
  });

  result.resources.forEach((resource) => {
    reporter.info(`Create CloudinaryAsset >>> ${resource.public_id}`);
    createNode({
      id: createNodeId(resource.public_id),
      ...resource,
      internal: {
        type: "CloudinaryAsset",
        content: JSON.stringify(resource),
        contentDigest: createContentDigest(resource),
      },
    });
  });
};

exports.sourceNodes = (gatsbyUtils) => {
  const { reporter } = gatsbyUtils;

  reporter.info("sourceNodes - START");
  createCloudinaryNodes(gatsbyUtils);
  reporter.info("sourceNodes - DONE");
};

// CONSOLE OUTPUT
// info sourceNodes - START
// info sourceNodes - DONE
// info Create CloudinaryAsset >>> queen.raae.codes-test-5/static/raae-avatar
// info Create CloudinaryAsset >>> queen.raae.codes-test-5/static/raae
// ... more nodes
```

In the "console output," you see that nodes are created outside of `sourceNodes`.

The fix is to await `createCloudinaryNodes'and make `exports.sourceNodes` an asyncrounous functions.

```js
exports.sourceNodes = async (gatsbyUtils) => {
  const { reporter } = gatsbyUtils;

  reporter.info("Sourcing nodes - START");
  await createCloudinaryNodes(gatsbyUtils);
  reporter.info("Sourcing nodes - DONE");
};

// CONSOLE OUTPUT
// info sourceNodes - START
// info Create CloudinaryAsset >>> queen.raae.codes-test-5/static/raae-avatar
// info Create CloudinaryAsset >>> queen.raae.codes-test-5/static/raae
// ... more nodes
// info sourceNodes - DONE
```

&nbsp;  
All the best,  
Queen Raae
