gatsby-source-wordpress
79 k downloads april 1.

[feat(gatsby-source-wordpress): enable image-cdn
#34832](https://github.com/gatsbyjs/gatsby/pull/34832/files)

commented out, means new code in this PR

```js
//packages/gatsby-source-wordpress/src/steps/source-nodes/fetch-nodes/fetch-referenced-media-items.js
import { getPlaceholderUrlFromMediaItemNode } from "../create-nodes/process-node"

....
    // const placeholderUrl = getPlaceholderUrlFromMediaItemNode(
    //     node,
    //     pluginOptions
    //   )

    //   const url = node.sourceUrl || node.mediaItemUrl

    //   const filename =
    //     node?.mediaDetails?.file?.split(`/`)?.pop() ||
    //     path.basename(urlUtil.parse(url).pathname)

      node = {
        ...node,
        // url,
        // contentType: node.contentType,
        // mimeType: node.mimeType,
        // filename,
        // filesize: node?.mediaDetails?.fileSize,
        // width: node?.mediaDetails?.width,
        // height: node?.mediaDetails?.height,
        // placeholderUrl:
        //   placeholderUrl ?? node?.mediaDetails?.sizes?.[0]?.sourceUrl ?? url,
        parent: null,
        internal: {
          contentDigest: createContentDigest(node),
          type: buildTypeName(`MediaItem`),
        },
      }

      // if (localFileNode) {
      //   node.localFile = localFileNode?.id
      // }

      const normalizedNode = normalizeNode({ node, nodeTypeName: `MediaItem` })

      await actions.createNode(normalizedNode)
	@@ -394,7 +416,7 @@ export const fetchMediaItemsBySourceUrl = async ({
          )

          nodes.forEach((node, index) => {
//            if (!node || !node?.localFile?.id) {
              return


```

