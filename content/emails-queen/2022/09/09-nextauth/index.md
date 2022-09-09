---
title: Did you know you can use NextAuth with Gatsby?
emojii: 🔐 👤
tags: Authentication, Twitter
brands: NextAuth
peeps: inezabonte
---

Oh boy, did we have trouble on yesterday's [unauthorized and rum-fueled treasure hunt](https://youtu.be/UWVsibCXBFg) in the sharky waters around the Gatsby islands 😬

Luckily [Ineza](https://twitter.com/inezabonte) came through and got us back on track with some swift googling 🙏

[![From a google search, I see some comments about using node v18 - comment by Ineza](./screendump-ineza-comment.jpg)](https://youtu.be/UWVsibCXBFg)

It turns out neither NextAuth nor Gatsby polyfills `Request`, but it can easily be solved using Node v18!

## The What?

Moving from Supabase Auth to [NextAuth](https://next-auth.js.org/) for our little side project [Prune your follows](https://prune.raae.tech/)

## The Why?

NextAuth is truly open source with a bring your own database (BYOD) approach. But most importantly, in our case, let us get access to a user's Twitter Access Token so we can request on their behalf. Getting around some pretty aggressive request limits on the Twitter API.

## The How

We followed the [Getting Started Docs](https://next-auth.js.org/getting-started/example) with some minor differences:

- Make sure you are using Node v18.

```
nvm use 18
```

- Install NextAuth with the `ignore-engines` flag. Using Node v18 is not officially supported yet, but it does work. Read more in this [NextAuth Issue on Github](https://github.com/nextauthjs/next-auth/issues/4819).

```
yarn add next-auth --ignore-engines
```

- Add the `[...nextauth].js` file in `src/api/auth/` and do a little magic to the request object.

```js
export default async function handler(req, res) {
  req.query.nextauth = req.params.nextauth.split("/");
  return await NextAuth(req, res, authConfig);
}
```

Other than that, you are as good as gold!

&nbsp;

Check out the [Pull Request on Github](https://github.com/queen-raae/prune-your-follows/pull/15) to view the move from Supabase Auth to NextAuth. The next step is to bring our own database, or do it all without any storage 🤔

&nbsp;

All the best,  
Queen Raae
