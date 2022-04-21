---
title: Gatsby's createNodeId is deterministic
emojii: 📥 💡
tags: source plugins, gatsby-node.js
---

Let's start with a definition:

> In computer science, a deterministic algorithm is an algorithm that, given a particular input, will always produce the same output[...] <cite>[Wikipedia](https://en.wikipedia.org/wiki/Deterministic_algorithm)</cite>

In our Gatsby Source YouTube oEmbed Plugin, I did not trust this to be true. Complicating the code by caching the connection between the YouTube Id and the generated node id as part of the [How to use the Gatsby Cache to skip subsequent external API calls](/emails/2022-03-18-cache/)

But I had this inkling it would make sense for it is deterministic and made sure to check with Ward when he guested last week's unauthorized and rum-fueled treasure hunt.

Then this week, I came over a source plugin in the wild that does not make use of `createNodeId`'s deterministic nature, prompting me to share this information with you and update the [Gatsby Source YouTube oEmbed Plugin](https://github.com/queen-raae/gatsby-source-youtube-oembed/pull/8).

Did you know?  
Do you care?

&nbsp;  
All the best,  
Queen Raae
