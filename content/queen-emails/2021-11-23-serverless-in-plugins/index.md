---
title: Gatsby Serverless Functions inside Gatsby Plugins
emojii: 𝛌 🤯
---

**Did you know Gatsby Plugins can contain Gatsby Serverless Functions?**

![Screengrab showing a /api/hello endpoint coming from the demo site and a /api/@raae/gatsby-plugin-donations/hello endpoint coming from the plugin](/demo.png "Demo")

Since Kyle made an off handed comment about it on our [unauthorized and rum-fueled treasure hunt](https://youtu.be/gG9E7ZYbhGo) in the sharky waters around the Gatsby islands" back in June, I have been meaning to check it out.

Last week I finally had the time and the use case for exploring 🎉

Two things tripped me up:

- The structure of the API-folder
- Plugin options are not available

Let's take a close look, so you do not have to trip up as well.

## The structure of the api-folder

For your plugin's functions to be picked up, they must live inside a folder structure mirroring the plugin's name, not directly in the api-folder as I assumed.

For a scoped plugin such as mine:

```
src/
├─ api/
│  ├─ @raae/
│  │  ├─ gatsby-plugin-donations/
│  │  │  ├─ hello.js
```

For a non-scoped plugin:

```
src/
├─ api/
│  ├─ gatsby-plugin-donations/
│  │  ├─ hello.js

```

Plugin options are not available

Plugins are meant to be configured using plugin options, but there is no way to get access to those options from a Gatsby Plugin Function 😿

This feels like an oversight to me....

You can read the Twitter [discussion I had with Kyle](https://twitter.com/raae/status/1460649528202305541?s=20) about it. It ended withh him suggesting I create an issue.

[![Haven't the convention been to add secrets as plugin options?
Getting them from env vars of course. So that a plugin does not "own" any env vars. ](tweet.png "Screengrab of Tweet")](https://twitter.com/raae/status/1460649528202305541?s=20)

So I did, or more correctly, I started a discussion under [Ideas / Feature Requests](https://github.com/gatsbyjs/gatsby/discussions/34047). Go upvote and add your thoughts!!

But for the time being, Gatsby Functions inside Gatsby Plugins will have to rely on env variables to be configured.

All the best,  
Queen Raae

**​PS:** Yes, I am working on a donations with Stripe plugin. Work in progress can be [found on Github](https://github.com/queen-raae/gatsby-plugin-donations/pull/6). I am looking for beta testers! Is that you?
