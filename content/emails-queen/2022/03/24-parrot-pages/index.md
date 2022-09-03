---
title: Multiple parrot pages for the same node type in Gatsby
emojii: 📄 3️⃣
tags: file system route api, gatsby-source-filesystem
---

How can you achieve different page layouts for content with the same content node type but varying content types such as posts, projects, and pages?

The approach covered in yesterday's email used [multiple page components](/emails/2022-03-23-page-components/); the day before was [multiple page templates](/emails/2022-03-22-page-templates/) and today we are covering my current favorite: _multiple parrot pages_.

If you are not familiar with the term parrot pages, it's what we call files system routes around the Gatsby islands 🤪

## Multiple Parrot Pages 🦜

The title is a little misleading as we cannot make multiple parrot pages for the same node type. But we'll use a nice little trick of creating new nodes named after the content type, resulting in the opportunity to make multiple parrot pages:

```
src/
├─ pages/
│  ├─ post/
│  │  ├─ {Post.slug}.js
│  ├─ project/
│  │  ├─ {Project.slug}.js
```

We create new nodes by hooking into the `onCreateNode` extension point:

```js
// gatsby-node.js
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = (gatsbyUtils) => {
  const { actions, node, getNode, reporter, createNodeId } = gatsbyUtils;
  const { createNode } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const parentFileNode = getNode(node.parent);
    const contentType = parentFileNode?.sourceInstanceName || "";

    const contentNodeId = createNodeId(`${node.id} >>> ${contentType}`);
    const slug = createFilePath({ node: parentFileNode, getNode });

    createNode({
      id: contentNodeId,
      slug: slug,
      childMarkdownRemark: node.id, // 👈
      internal: {
        contentDigest: node.internal.contentDigest,
        type: contentType,
      },
    });

    reporter.info(`${contentType} created for ${slug}`);
  }
};
```

Take note of the childMarkdownRemark key added to the new node! It's what connects the new node to its content. However, if we query the new nodes at this point, we'll only get the node id.

How can we get the full content? By modifying their schema using `@link`:

```js
// gatsby-node.js

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type Post implements Node {
      slug: String
      childMarkdownRemark: MarkdownRemark @link
    }
    type Project implements Node {
      slug: String
      childMarkdownRemark: MarkdownRemark @link
    }
  `;

  createTypes(typeDefs);
};
```

Now inside our parrot pages, we can query for the content on childMarkdownRemark:

```js
// {Post.slug}.js

import React from "react";
import { graphql } from "gatsby";

const PostPage = ({ data }) => {
  const { html, frontmatter } = data.post?.childMarkdownRemark;
  const { title } = frontmatter;
  return (
    <main>
      <article>
        <header>
          <h1>{title}</h1>
        </header>
        <section dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
};

export default PostPage;

export const query = graphql`
  query ($id: String!) {
    post(id: { eq: $id }) {
      childMarkdownRemark {
        html
        frontmatter {
          title
        }
      }
    }
  }
`;
```

Same as the other days, the `sourceInstanceName` used comes from configuring your `gatsby-source-filesystem` with the `name` option.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: "Post",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
        name: "Project",
      },
    },
  ],
};
```

How do you solve different page layouts for content with the same content node type but varying content types?

&nbsp;  
All the best,  
Queen Raae
