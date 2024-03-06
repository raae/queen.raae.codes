---
title: The cache solution that keeps on NOT giving...
emojii: 😬 📥
---

As mentioned in Tuesday's email:

> For each MarkdownRemark-node Gatsby Remark oEmbed finds the standalone links, checks the oEmbed provider list for a match, and swaps the link out for the result coming back from the matching provider's oEmbed endpoint.

I decided early on to download the provider list on each build. oEmbed providers come and go with no effect on how the plugin should work.

The provider list is downloaded and saved in the Gatsby Cache using the `onPreBootstrap` lifecycle hook.

Back in October 2018, this did not work. I could not understand why, but it turned out to be a bug with the sub-plugin cache implementation.

It [got fixed by Gatsby](https://github.com/gatsbyjs/gatsby/issues/8788) in January 2019, and all was good in the world of Gatsby Remark oEmbed 🎉

But that did not last long. MDX took the world by storm. Gatsby Remark oEmbed, however, does not play nice.

[Swizec figured out why](https://github.com/queen-raae/gatsby-remark-oembed/pull/88):

> The issue was that gatsby-plugin-mdx implements onPreBootstrap, overriding oEmbed's onPreBootstrap implementation.

He changed the implementation:

> When we try to use the list of providers, we now re-fetch it and update the cache if it isn't yet available in cache. This makes the plugin work with MDX.

It works 🎉🎉🎉

Life gets in the way, and I never release a new version.

Fast forward to a couple of weeks ago, and the fix no longer works 🤯

In the node transformation step, saving to the Gatsby Cache never sticks for sub-plugins. [Check the bug report for more details](https://github.com/gatsbyjs/gatsby/issues/35415), and feel free to make some noise with emojis and comments.

It could be solved by shipping the providers list with the plugin. It just feels wrong though...

&nbsp;  
All the best,
Queen Raae
