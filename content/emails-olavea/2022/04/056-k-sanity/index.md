gatsby-source-sanity@^7.4.0
56.8 k downloads april 1.

https://gatsby.dev/img

```js
// package.json
"gatsby-plugin-utils": "^3.5.0-next.0",
```

// src/gatsby-node.ts

[feat: Add Gatsby Image CDN support
#148](https://github.com/sanity-io/gatsby-source-sanity/pull/148/files#)

commented out, means new code in this PR

```js
// src/util/normalize.ts

// Transform a Sanity document into a Gatsby node
export function toGatsbyNode(doc: SanityDocument, options: ProcessingOptions): SanityInputNode {
  const {createNodeId, createContentDigest, overlayDrafts} = options
  const rawAliases = getRawAliases(doc, options)
  const safe = prefixConflictingKeys(doc)
  const withRefs = rewriteNodeReferences(safe, options)
//   const type = getTypeName(doc._type)
//   const urlBuilder = imageUrlBuilder(options.client)

//   const gatsbyImageCdnFields = [`SanityImageAsset`, `SanityFileAsset`].includes(type)
//     ? {
//         filename: withRefs.originalFilename,
//         width: withRefs?.metadata?.dimensions?.width,
//         height: withRefs?.metadata?.dimensions?.height,
//         url: withRefs?.url,
//         placeholderUrl:
//           type === `SanityImageAsset`
//             ? urlBuilder
//                 .image(withRefs.url)
//                 .width(20)
//                 .height(30)
//                 .quality(80)
//                 .url()
//                 // this makes placeholder urls dynamic in the gatsbyImage resolver
//                 ?.replace(`w=20`, `w=%width%`)
//                 ?.replace(`h=30`, `h=%height%`)
//             : null,
//       }
//     : {}

  return {
    ...withRefs,
    ...rawAliases,
//    ...gatsbyImageCdnFields,

    id: safeId(overlayDrafts ? unprefixId(doc._id) : doc._id, createNodeId),
    children: [],
    internal: {
//      type,
      contentDigest: createContentDigest(JSON.stringify(withRefs)),
    },
  }



```