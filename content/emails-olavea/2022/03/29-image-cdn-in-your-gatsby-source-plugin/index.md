---
title: Image CDN support in your gatsby source plugin
---

## My Gatsby Skill Builder Session:

Today I Added Image CDN support to Queen @raae's
Gatsby source plugin.

## What did I do?

I replicated a little of what Queen @raae live coded with @wardpeet on our Thursday Treasure Hunt in the sharky waters around the @GatsbyJS islands

## Why did I do it?

Speed up your build when you use the plugin

## How did I do it?
My steps are G. - I. M.
Later I'll do A. G. E. - C. D. N.





### G. GraphQL object type
Creating a new node type

```js

```

### I.

```js

```

### M.

```js

```


For the live version of my skill-builder session:, watch [Sunday's OlaCast on YouTube](https://youtu.be/v00Uro6UQvY)

&nbsp;
💪😺👍
Keep your skill-building-ship afloat this week!
⛵🔧🏴‍☠️

&nbsp;
Ola Vea
Cap'n of his own skill-builder-ship


Here is the finished gatsb-node.js file

```js
const axios = require("axios");
const {
  polyfillImageServiceDevRoutes,
  addRemoteFilePolyfillInterface,
} = require("gatsby-plugin-utils/polyfill-remote-file");

const SPLIT_ASCII = ">>>";
const IS_PROD = process.env.NODE_ENV === "production";
const REFRESH_INTERVAL = IS_PROD ? 0 : 60000 * 5; // 60000 ms === 1 min

exports.onCreateDevServer = ({ app }) => {
  polyfillImageServiceDevRoutes(app);
};

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    youTubeIds: Joi.array().items(Joi.string()).required(),
    refreshInterval: Joi.number().min(0).default(REFRESH_INTERVAL),
    // Will not document splitAscii, only for internal use
    splitAscii: Joi.string().default(SPLIT_ASCII),
  });
};

const fetchEmbed = async (id) => {
  const youTubeUrl = `https://youtu.be/${id}`;
  const { data } = await axios.get("https://www.youtube.com/oembed", {
    params: {
      url: youTubeUrl,
    },
  });
  return { ...data, url: youTubeUrl };
};

const prepYouTubeNode = async (gatsbyUtils, pluginOptions, youTubeId) => {
  const {
    actions: { createNode, touchNode },
    createNodeId,
    createContentDigest,
    reporter,
    cache,
    getNode,
  } = gatsbyUtils;
  const { refreshInterval = REFRESH_INTERVAL, splitAscii } = pluginOptions;

  const youTubeCache = await cache.get(youTubeId);
  const [existingNodeId, timestamp] = youTubeCache?.split(splitAscii) || [];
  const existingNode = getNode(existingNodeId);
  const existingNodeAge = Date.now() - timestamp;

  if (existingNode && existingNodeAge <= refreshInterval) {
    // Node already exists, make sure it stays around
    touchNode(existingNode);
    reporter.info(`Touched YouTube Node for ${youTubeId}`);
  } else {
    // Fetch oEmbed data and create node
    const youTubeNodeId = createNodeId(`you-tube-${youTubeId}`);
    const embedData = await fetchEmbed(youTubeId);

    createNode({
      id: youTubeNodeId,
      youTubeId: youTubeId,
      oEmbed: embedData,
      internal: {
        type: `YouTube`,
        contentDigest: createContentDigest(embedData),
      },
    });

    await cache.set(youTubeId, `${youTubeNodeId}${splitAscii}${Date.now()}`);
    reporter.info(`Created YouTube Node for ${youTubeId}`);
  }
};

exports.sourceNodes = async (gatsbyUtils, pluginOptions) => {
  const { youTubeIds } = pluginOptions;
  await Promise.all(
    youTubeIds.map((id) => prepYouTubeNode(gatsbyUtils, pluginOptions, id))
  );
};

exports.onCreateNode = async (gatsbyUtils) => {
  const { node, actions, reporter, createNodeId } = gatsbyUtils;
  const { createNodeField, createNode } = actions;

  if (node.internal.type === `YouTube`) {
    const youTubeThumbnailNodeId = createNodeId(
      `you-tube-thumbnail-${node.youTubeId}`
    );

    createNode({
      id: youTubeThumbnailNodeId,
      parent: node.id,
      youTubeId: node.youTubeId,
      url: node.oEmbed.thumbnail_url,
      mimeType: "image/jpeg",
      filename: node.youTubeId + ".jpg",
      height: node.oEmbed.thumbnail_height,
      width: node.oEmbed.thumbnail_width,
      internal: {
        type: `YouTubeThumbnail`,
        contentDigest: node.internal.contentDigest,
      },
    });

    reporter.info(
      `Created YouTubeThumbnail Node for ${node.youTubeId} thumbnail`
    );
  }
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes([
    `
    type YouTube implements Node {
      thumbnail: YouTubeThumbnail @link(from: "youTubeId" by: "youTubeId")
    }
  `,
    addRemoteFilePolyfillInterface(
      schema.buildObjectType({
        name: `YouTubeThumbnail`,
        fields: {
          // fields You don't need
          youTubeId: "String!",
        },
        interfaces: [`Node`, `RemoteFile`],
      }),
      {
        schema,
        actions,
      }
    ),
  ]);
};
```
