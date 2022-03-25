---
title: How to add support for Gatsby ImageCDN in your source plugin
emojii: 🖼 ☁️
---

On yesterday's unauthorized and rum-fueled [treasure hunt](https://youtu.be/IDW2IfaHGIs) in the sharky waters around the Gatsby islands, the great and powerful Ward Peeters helped us add Gatsby ImageCDN support to the YouTube oEmbed plugin.

It was his third time on the show; if you missed the other two, have fun catching up:

- [File System Route API to create a page per YouTube video](https://youtu.be/TX5XPuHhz9o)
- [Deferred Static Generation (DSG) for older videos](https://youtu.be/UsSJ_QNp6uo)

## Why add Gatsby ImageCDN support?

Ward [said it best](https://youtu.be/IDW2IfaHGIs?t=4345):

- Faster builds (both local and in the cloud)
- Better performance in the browser compared to a CDN on a different domain

Adding support for Gatsby ImageCDN still lets you deploy to other services like Netlify. Build time there will be faster, in the same way, it's faster locally, by only downloading the images in use by the site. The "old way" `createRemoteFileNode` would eagerly download all images.

## How to add Gatsby ImageCDN support?

We'll need to replace the use of `createRemoteFileNode` with creating our own `RemoteFile` nodes.

Many CMSs already have their own asset node type they can extend with `RemoteFile`, but for our plugin, we first need to create a new node type that extends `RemoteFile`:

```js
// gatsby-node.js
const {
  addRemoteFilePolyfillInterface,
} = require("gatsby-plugin-utils/polyfill-remote-file");

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes([
    addRemoteFilePolyfillInterface(
      schema.buildObjectType({
        name: `YouTubeThumbnail`,
        fields: {
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

`addRemoteFilePolyfillInterface` makes sure the plugin works even if the Gatsby site is on a lower version than 4. To make sure it works on older versions even in develop, you want to add `polyfillImageServiceDevRoutes`:

```js
// gatsby-node.js
const {
  polyfillImageServiceDevRoutes,
} = require("gatsby-plugin-utils/polyfill-remote-file");

exports.onCreateDevServer = ({ app }) => {
  polyfillImageServiceDevRoutes(app);
};
```

Then we are ready to replace our usage of `createRemoteFileNode` in `onCreateNode` 🎉

```js
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

    createNodeField({
      node,
      name: `thumbnailFileId`,
      value: youTubeThumbnailNodeId,
    });

    reporter.info(
      `Created YouTubeThumbnail Node for ${node.youTubeId} thumbnail`
    );
  }
};
```

The last step for us is to update the YouTube Node's schema customization to use the new node type `YouTubeThumbnail` instead of `File`:

```js
// gatsby-node.js
actions.createTypes([
  `
    type YouTube implements Node {
      thumbnail: YouTubeThumbnail @link(from: "youTubeId" by: "youTubeId")
    }
  `,
]);
```

Check out the [Pull Request on GitHub](https://github.com/queen-raae/gatsby-source-youtube-oembed/pull/7/files) for the complete diff!

&nbsp;  
All the best,  
Queen Raae
