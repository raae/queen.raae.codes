---
title: Is your gatsby-node.js getting out of hand?
emojii: 📜 📜
---

We've all been there; you just want to source a little here, create some pages there, and then before you know it, your gatsby-node.js is _as long as a bad year_ (Norwegian proverb).

Code files becoming too long is not unique to gatsby-node.js. But there is a Gatsby way to solve it: plugins.

"But I have no idea how to publish a plugin!"

The good news is you do not have to!

You can use:

- [a local plugin](https://www.gatsbyjs.com/docs/creating-a-local-plugin/#project-structure-for-a-local-plugin),
- or make use of [yarn workspace](https://classic.yarnpkg.com/en/docs/cli/workspace).

In theory, you may also use npm workspace, but I can never get those to work. If you do, please tell me your secret.

A plugin may include more than the gatsby-node.js file. But it's the one that always gets out of hand first for me, so it's the one that pushed me to start modularizing with plugins.

**Why make use of a Gatsby plugin?**

- Encapsulates a feature set across gatsby-node.js, gatsby-ssr.js, gatsby-browser.js, and Serverless Functions.
- You may even add a gatsby-config.js, but that tends to complicate things quickly.
- Scanning the gatsby-config.js for your site makes it easy to get an overview of the feature set, assuming good naming practices.
- If you decide to create a private (or public) set of plugins, it's an easy transition.
- Very little boilerplate is needed: a package.json file, and you are good to go.

&nbsp;  
Have you ever made a local plugin?

&nbsp;  
All the best,  
Queen Raae

&nbsp;  
**PS:** We'll have a look at the local plugin approach in today's unauthorized and rum-fueled [treasure hunt](https://youtu.be/26CDRdhXozo).
