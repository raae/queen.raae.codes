gatsby-source-contentful@^7.8.0
278.1 k downloads april 1.

https://www.gatsbyjs.com/plugins/gatsby-source-contentful/?=gatsby-source-contentful


[feat(gatsby-source-contentful): enable image-cdn
#34831](https://github.com/gatsbyjs/gatsby/pull/34831/files)

commented out, means new code in this PR
```js
// packages/gatsby-source-contentful/src/normalize.js


//    const file = assetItem.fields.file ? getField(assetItem.fields.file) : {}
    const assetNode = {
      contentful_id: assetItem.sys.id,
      spaceId: space.sys.id,
      id: mId(space.sys.id, assetItem.sys.id, assetItem.sys.type),
      createdAt: assetItem.sys.createdAt,
      updatedAt: assetItem.sys.updatedAt,
      parent: null,
      children: [],
//      file,
      title: assetItem.fields.title ? getField(assetItem.fields.title) : ``,
      description: assetItem.fields.description
        ? getField(assetItem.fields.description)
        : ``,
      node_locale: locale.code,
      internal: {
        type: `${makeTypeName(`Asset`)}`,
      },
      sys: {
        type: assetItem.sys.type,
      },
    //   url: `https:${file.url}`,
    //   placeholderUrl: `https:${file.url}?w=%width%&h=%height%`,
    //   mimeType: file.contentType,
    //   filename: file.fileName,
    //   width: file.details?.image?.width,
    //   height: file.details?.image?.height,
    }




```