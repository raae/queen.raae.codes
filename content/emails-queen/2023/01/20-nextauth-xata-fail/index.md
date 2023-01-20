---
title: Failing to use NextAuth with a Xata Worker for Prune your Follows
brands: Xata, NextAuth
tags: serverless, treasure hunt, failure
---

I naively thought all we needed for NextAuth to work with a Xata Worker was getting access to the `NEXTAUTH_SECRET` env variable.

But alas, when moving to a Xata Worker, the cookie set by NextAuth is unavailable as the Worker is served from another domain. However, the `getToken` function can also get the token from the `Authorization: 'Bearer token'. But how do we make that happen 🤷‍♀️

[![That feeling when you realise on stream that your cookie + JWT knowledge is not as solid as you thought...well it will become solid!](./tweet.png)](https://twitter.com/raae/status/1616165782123069459)

We'll figure it out over the next few weeks! I am sure 💪

If you have any experience with Cloudflare Workers (Xata Workers are an abstraction on top of Cloudflare Workers) and NextAuth, please reach out 🙏

&nbsp;

All the best,\
Queen Raae
