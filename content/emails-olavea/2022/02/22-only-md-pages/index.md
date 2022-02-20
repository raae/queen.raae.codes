---
title: Do not create pages for markdown sections, only markdown pages
---

## My Sunday Skill Builder Session:

This Sunday, I only created pages for markdown pages, not for markdown sections. On our POW!-website.

## What did I do?

I created a page with markdown and the createPages hook from @GatsbyJS

## Why did I do it?

Because it's less build time and because Queen Benedicte @raae told me to do it.

## How did I do it?

I started out with my 1.2.3 A.B.C. mnemonic Gingerbread house

1. Supplies: allMarkdownRemark.node
2. Bakingsong = bakingSong.js
3. Loop over the supply node and create a page

A. Ahoy! Aroma path!
B. BakingSong is a component
C. Catsby id is context


```js
// POW!-website/gatsby-node.js
async function bakeMarkdownNodesIntoPages({ graphql, actions }) {
  //  only create pages for markdown pages and not sections.
  // only index.md qualify as a page. Everything else is a markdown section content.

  // 1. Supplies: allMarkdownRemark.node
  const { data } = await graphql(`
    {
      supplies: allMarkdownRemark(
        filter: { fields: { slug: { eq: "/index/" } } }
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);
  console.log(data.supplies);

  // 2. Bakingsong = bakingSong.js
  const pageTemplate = require.resolve("./src/templates/pageTemplate.js");

  // 3. Loop over the supply node and create a page
  data.supplies.nodes.forEach((node) => {
    actions.createPage({

      // A. Ahoy! Aroma path!
      path: node.fields.slug,

      // B. BakingSong is a component
      component: pageTemplate,

      // C. Catsby node.id is context
      context: {
        catsby: node.id,
      },
    });
  });
}

exports.onCreateNode = async (gatsbyUtils) => {
  await Promise.all([slugifyMarkdownRemarkNode(gatsbyUtils)]);
};

// 1.2.3 – A.B.C. – Gingerbread house

// 1. Supplies: allMarkdownRemark.node
// 2. Bakingsong = bakingSong.js
// 3. Loop over the supply node and create a page

// A. Ahoy! Aroma path!
// B. BakingSong is a component
// C. Catsby node.id is context
exports.createPages = async (gatsbyUtils) => {
  await Promise.all([bakeMarkdownNodesIntoPages(gatsbyUtils)]);
};
```

For the long version, watch [Sunday's OlaCast on YouTube](https://youtu.be/lMDA0WuAZSA)


💪😺👍
Keep your skill-building-ship afloat this week!
⛵🔧🏴‍☠️


Ola Vea
Cap'n of his own skill-builder-ship
