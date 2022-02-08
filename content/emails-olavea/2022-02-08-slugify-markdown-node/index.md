---
title: Ola adds a sslug field to his homemade markdown node
---

## My Sunday Skill Builder Session:

This Sunday, I added a slug field to my homemade markdown node. 🐛

## What did I do?

I added a slug field to my homemade markdown node with createNodeField from the onCreateNode hook

## Why did I do it?

I need that slug to add support for a basic content section so I can create Markdown marketing pages with sections for Queen @raae's usepow.app

## How did I do it ?
### Short version:

```js
// POW!-website / gatsby - node.js;
async function slugifyMarkdownRemarkNode({ actions, node, getNode }) {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      name: "slug",
      node,
      value: slug,
    });
  }
}

exports.onCreateNode = async (gatsbyUtils) => {
  await Promise.all([slugifyMarkdownRemarkNode(gatsbyUtils)]);
};
```

### Cheat Sheet:

```js
async function slugifyMarkdownRemarkNode({ actions, node, getNode }) {              // POW!-site/gatsby-node.js
  // 🔨💰🍓
  con
  // my md type of node ... internal
  if ( ) {
    // 🐛 = 🔨 + 📁 + 🎢 ({ node, getNode })
  con
    // 🔨💰🍓 ({ 🐛, 💰, 🐛 })
    cre
      na
      no
      va
    })
  }
};
```
If you can guess what one of the emojis mean, reply to this email 😺👍

### Longer version:

[Sunday's OlaCast on YouTube](https://youtu.be/otRx6U5zASw)

💪😺👍

Keep your skill-builder-ship afloat this week!

🔧⛵🏴‍☠️

Ola Vea
Cap'n of his own skill-builder-ship
