---
title: When to (and not to) create Gatsby Content Nodes?
emojii: ✅ ❌
tags: sourceNodes, onCreateNode, source plugins
---

With Gatsby v4 came a much [strickter approach](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-source-plugin-from-v3-to-v4/#2-data-mutations-need-to-happen-during-sourcenodes-or-oncreatenode) to node creation. You must only create nodes in `sourceNodes` and `onCreateNode`.

Never in a resolver or anywhere else, even though I stumble over Gatsby Docs pointing in that direction every now and then.

And remember, if you create a node in `onCreateNode` make sure [to add a parent](/posts/2022-04-01-parent-id/), or it will be gone on subsequent builds using the Gatsby Cache.

&nbsp;  
All the best,  
Queen Raae
