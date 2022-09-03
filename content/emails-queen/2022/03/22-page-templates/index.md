---
title: Multiple page templates for the same node type in Gatsby
emojii: 📄 1️⃣
tags: gatsby-source-filesystem, page templates
---

How can you achieve different page layouts for content with the same content node type but varying content types?

A typical example is sourcing both posts and projects content from markdown. Both posts and projects are added to the Gatsby Content Layer as MarkdownRemark Nodes. But are "logically" different content types.

This week we'll look at three different approaches!

First up is using _multiple page templates_. Tomorrow's email looks at [multiple page components](/emails/2022-03-23-page-components/), and then we'll round it off with my current favorite: [parrot pages](/emails/2022-03-24-parrot-pages/).

## Multiple Page Templates

For the _multiple page templates_ approach, we'll use the `createPages` extension point to create a page for each markdown file.

Something you probably have done before, but we'll extend on it a little and make sure it selects the correct page template for the content type:

```js
// gatsby-node.js
const path = require(`path`);

exports.createPages = async (gatsbyUtils) => {
  const { actions, graphql, reporter } = gatsbyUtils;
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
        }
      }
    }
  `);

  const templates = {
    post: path.resolve(`src/templates/post-template.js`),
    project: path.resolve(`src/templates/project-template.js`),
  };

  data.allMarkdownRemark.nodes.forEach((node) => {
    const contentType = node.parent.sourceInstanceName;
    createPage({
      path: contentType + node.fields.slug,
      component: templates[contentType],
      context: {
        id: node.id,
      },
    });

    reporter.info(
      `Created page for slug ${node.fields.slug} with type ${contentType}`
    );
  });
};
```

The `sourceInstanceName` used comes from configuring your `gatsby-source-filesystem` with the `name` option.

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

And the slug is created using the `onCreateNode` extention point.

```js
// gatsby-node.js
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = (gatsbyUtils) => {
  const { actions, node, getNode, reporter } = gatsbyUtils;
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode });

    createNodeField({
      name: "slug",
      node,
      value: slug,
    });

    reporter.info(`Create slug ${slug}`);
  }
};
```

How do you solve different page layouts for content with the same content node type but varying content types?

&nbsp;  
All the best,  
Queen Raae
