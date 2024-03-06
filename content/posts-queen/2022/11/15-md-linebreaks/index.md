---
title: Linebreaks, Markdown and VS Code
emojii: 🏝 🗓
tags: docs
brands: cloudinary
---

**TLDR:** Use `/` to indicate a line break in Markdown, for example, when making an emoji bullet list:

```md
⭐️ Star the repository on Github\
🐦 Tweet about the plugin, and make sure to tag @cloudinary\
👩‍💻 Create content about the plugin and let @cloudinary know on Twitter\
✍️ Refer to the plugin in your project's readme
```

Working on the docs for [gatsby-source-cloudinary](https://github.com/cloudinary-devs/gatsby-source-cloudinary) today, I again encountered the problem with using ` ` (i.e. double space) at the end of a line to indicate a line break.

By default, VSCode removes trailing whitespace. I disabled this setting at one point, but Ola still has the default setting. Whenever he worked on the docs the line breaks disappeared.

Unfortunately, this is not something we can solve with Prettier, and asking every contributor to disable the setting is not really feasible.

So I did some Googling, and what do you know: You can use `\`, problem solved!

&nbsp;

All the best,  
Queen Raae
