---
title: Multiple page components for the same node type in Gatsby
emojii: 📄 2️⃣
---

How can you achieve different page layouts for content with the same content node type but varying content types?

In yesterday's email, we looked at a solution involving _multiple page templates_. Today we'll look at achieving the same with _multiple page components_. And tomorrow we'll look at how to use _multiple file system routes_ by making our own MarkdownRemark parent nodes 🤯

## Multiple Page Components

For the _multiple page components_ approach, we can create the MarkdownRemark pages using either the `createPages` extension point or the File Sytem Route API.

Then inside our root page component, we'll make sure to render the correct page component for our content type and pass on the queried data.

```js
// src/pages/{MarkdownRemark.fields__slug}.js
import React from "react";
import { graphql } from "gatsby";

import PostTemplate from "../components/post-page";
import ProjectTemplate from "../components/project-page";

const components = {
  post: PostTemplate,
  project: ProjectTemplate,
};

const RemarkPage = ({ data, ...props }) => {
  const contentType = data.markdownRemark?.parent.sourceInstanceName;
  const Component = components[contentType]; // 👈
  return <Component data={data.markdownRemark} {...props} />;
};

export default RemarkPage;

// PostFragment defineded in the ../components/post-page.js file
// ProjectFragment defined in ../components/project-page.js file
export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      ...ProjectFragment
      ...PostFragment
      parent {
        ... on File {
          sourceInstanceName
        }
      }
    }
  }
`;
```

If GraphQL Fragments are new to you, check out the [Using GraphQL Fragments ](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/using-graphql-fragments/) article by Gatsby for more information.

Same as yesterday, the `sourceInstanceName` used comes from configuring your `gatsby-source-filesystem` with the `name` option.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: "post",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
        name: "project",
      },
    },
  ],
};
```

And the slug is created using the `onCreateNode` extension point.

```js
// gatsby-node.js
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = (gatsbyUtils) => {
  const { actions, node, getNode, reporter } = gatsbyUtils;
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode });
    const parent = getNode(node.parent);

    createNodeField({
      name: "slug",
      node,
      value: parent.sourceInstanceName + slug,
    });

    reporter.info(`Create slug ${slug}`);
  }
};
```

How do you solve different page layouts for content with the same content node type but varying content types?

&nbsp;  
All the best,  
Queen Raae
