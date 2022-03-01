---
t1itle: Ola found one error while creating pages only for markdown pages, not for markdown sections.
---

## My Sunday Skill Builder Session:

This Sunday, I created pages only for markdown pages, not for markdown sections. On our POW!-website.

## What did I do?

I created pages with markdown and the createPages hook from @GatsbyJS

## Why did I do it?

Because it's tidyer than creating a bunch of "bonus" pages with content I already show on my index page. And because Queen Benedicte @raae told me to do it.

## How did I do it?

The short version is I started out with my 1.2.3 A.B.C. mnemonic Gingerbread house. And I found one error, see below.

1. filter ☕ first
2. bakingSong 🎵 🦢
3. aromaNode 🍰💰

A. aromaNodePath 🍰.🍓.🐛
B. bakingSong 🎵 🙀
C. catsbyId 😼🆔

## What was the error I found?

I forgot to rename `allMarkdownRemark` to `supplies` in my graphql query like this:

```js
// wrong

  const { data } = await graphql(`{
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/index.md/" } }
      ) {}
    }`)

// right

  const { data } = await graphql(`{
      supplies: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/index.md/" } }
      ) {}
    }`)
```

So that when I was going to use my data: `data.supplies.nodes.forEach` I got an error message and the pages were not created.

For the long version of My Sunday Skill Builder Session:, watch [Sunday's OlaCast on YouTube](https://youtu.be/hkGZiodGe7U)


💪😺👍
Keep your skill-building-ship afloat this week!
⛵🔧🏴‍☠️


Ola Vea
Cap'n of his own skill-builder-ship
