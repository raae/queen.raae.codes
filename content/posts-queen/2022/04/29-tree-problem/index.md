---
title: Fixing an abstract syntax tree bug in Gatsby Remark oEmbed
emojii: 🌲 🐛
---

On yesterday's [unauthorized and rum-fueled treasure hunt](https://youtu.be/dRFPUyTEwmo) in the sharky waters around the Gatsby islands, we fixed Issue #102: [`<div>` cannot appear as a descendent of `<p>`](https://github.com/queen-raae/gatsby-remark-oembed/issues/102).

[![YouTube Screengrab](./youtube-screengrab.png)](https://youtu.be/dRFPUyTEwmo)

To understand why this was happening, let us take a step back and look at how markdown can be represented as an Abstract Syntax Tree.

## Markdown Abstract Syntax Tree (mdast)

The following markdown:

```md
Intro text, [A link](https://youtu.be/fpFY82efGPI)!

[Another Link](https://youtu.be/fpFY82efGPI)

- [A third link](https://youtu.be/fpFY82efGPI)
- Some text
```

as a Markdown Abstract Syntax Tree (mdast):

![Markdown Abstract Syntax Tree](./mdast-1.png)

Each box is called a node, a tree always springs out from a root node, and the nodes without any children are called leaves.

And yes, it is an upside-down tree as Ola pointed out 🤪

## Our code

Gatsby Transformer Remark takes the markdown files, transforms the markdown into mdast, and passes it onto our plugin. We then "walk" the tree looking for standalone links.

![Markdown Abstract Syntax Tree](./mdast-2.png)

Then we swap out the link node for an HTML node if it is indeed an oEmbed link:

```
const tranformsLinkNodeToOembedNode = ({ node }, oembedResult) => {
  node.type = "html";
  node.value = oembedResult.html;
  delete node.children;
}
```

Giving us a slightly modified tree:

![Markdown Abstract Syntax Tree](./mdast-3.png)

Can you spot the mistake?

.  
.  
.  
.  
.  
.  
.  
.

## Our problem

The HTML node is a child of a paragraph node. Depending on the oEmbed HTML this might result in an invalid HTML structure when the mdast converts into HTML.

## The solution

Pass along the parent paragraph node as the node to be exchanged for an html node instead!

![Markdown Abstract Syntax Tree](mdast-4.png)

&nbsp;  
All the best,  
Queen Raae
