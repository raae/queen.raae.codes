---
title: Emoji as a favicon, no need for a designer...
emojii: 🖼 🎁
---

Did you know you can use an emoji as your favicon?

Modern browsers support SVG favicons, and SVG can render text and en emoji is text 🤯

```html
<link
  rel="icon"
  href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥳</text></svg>"
/>
```

I learned this neat little trick from [@chriscoyier](https://twitter.com/chriscoyier), who got it from [@LeaVerou](https://twitter.com/LeaVerou)!

- @LeaVerou's Original [tweet](https://twitter.com/LeaVerou/status/1241619866475474946)
- @chriscoyier article on [CSS Tricks](https://css-tricks.com/emojis-as-favicons/)

For fun, and to test out the @GatsbyJS Plugin Starter, I created [@raae/gatsby-plugin-svg-emoji-favicon](https://github.com/queen-raae/gatsby-plugin-svg-emoji-favicon) 🎉

But I often find myself reaching for it; favicons make any project seem more polished!

It's a good little plugin to look at to learn [how to add content to the head tag](https://github.com/queen-raae/gatsby-plugin-svg-emoji-favicon/blob/main/plugin/gatsby-ssr.js) of your pages.

&nbsp;  
All the best,  
Queen Raae

&nbsp;  
**PS:** Learn how to add test to your plugins on[tonight's unauthorized and rum-fueled treasure hunt](https://youtu.be/sj3YuX_TpVk) in the sharky waters around the Gatsby islands, and contribute a test or two to the favicon plugin if you'd like.
