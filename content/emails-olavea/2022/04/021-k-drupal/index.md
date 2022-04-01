gatsby-source-drupal


21 k downloads april 1.
[feat(gatsby-source-drupal): Image CDN support
#35265](https://github.com/gatsbyjs/gatsby/pull/35265/files)
```js
// packages/gatsby-source-drupal/src/normalize.js

// const probeImageSize = require(`probe-image-size`)

....
// const nodeFromData = async (
//   datum,
//   createNodeId,
//   entityReferenceRevisions = [],
//   pluginOptions,
//   fileNodesExtendedData
// ) => {
  const { attributes: { id: attributeId, ...attributes } = {} } = datum
  const preservedId =
    typeof attributeId !== `undefined` ? { _attributes_id: attributeId } : {}
  const langcode = attributes.langcode || `und`
//   const type = datum.type.replace(/-|__|:|\.|\s/g, `_`)

//   const isFile = isFileNode(datum, type)

//   const url = isFile
//     ? pluginOptions.baseUrl + getFileUrl(datum.attributes)
//     : null

//   const extraNodeData = fileNodesExtendedData?.get(datum.id) || null
//   const imageSize = isFile ? extraNodeData || (await probeImageSize(url)) : null

//   const gatsbyImageCdnFields =
//     isFile &&
//     imageSize &&
//     imageSize.width &&
//     imageSize.height &&
//     url &&
//     datum.attributes.filemime
//       ? {
//           filename: attributes?.filename,
//           url,
//           placeholderUrl: url,
//           width: imageSize.width,
//           height: imageSize.height,
//           mimeType: datum.attributes.filemime,
//         }
//       : {}




// packages/gatsby-source-drupal/src/utils.js
/**
 * This FN returns a Map with additional file node information that Drupal doesn't return on actual file nodes (namely the width/height of images)
 */
exports.getExtendedFileNodeData = allData => {
  const fileNodesExtendedData = new Map()

  for (const contentType of allData) {
    if (!contentType) {
      continue
    }

    contentType.data.forEach(node => {
      if (!node) {
        return
      }

      const { relationships } = node

      if (relationships) {
        for (const relationship of Object.values(relationships)) {
          const relationshipNodes = Array.isArray(relationship.data)
            ? relationship.data
            : [relationship.data]

          relationshipNodes.forEach(relationshipNode => {
            if (!relationshipNode) {
              return
            }

            if (
              relationshipNode.type === `file--file` &&
              relationshipNode.meta
            ) {
              fileNodesExtendedData.set(
                relationshipNode.id,
                relationshipNode.meta
              )
            }
          })
        }
      }
    })
  }

  return fileNodesExtendedData
}
```