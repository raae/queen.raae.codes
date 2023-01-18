---
title: Have you checked your Referrer-Policy?
---

[Prune your follows](https://pruneyourfollows.com) initial build was sponsored by Xata. As part of the agreement, the site has a "powered by Xata" notice on every page linking to [xata.io](https://xata.io/), in addition to a link to my site.

Looking at my our analytics, I found it weird that no one was clicking through from [pruneyourfollows.com](https://pruneyourfollows.com/) to [queen.raae.codes](https://queen.raae.codes/) or vice versa.

As I imagine tracking traffic from PYF is part of Xata's evaluation of our collab, I got a little worried 😬

Turns out the default Referrer-Policy is `same-origin` for Gatsby Cloud, Netlify, and probably most other similar platforms.

> `same-origin`: Send the origin, path, and query string for same-origin requests. Don't send the Referer header for cross-origin requests.
> <cite>[mdn web docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)</cite>

The only referrals tracked on for example, queen.raae.codes, were from itself to itself 🤦‍♀️

After reading [Referer and Referrer-Policy best practices](https://web.dev/referrer-best-practices) from web.dev I landed on using `strict-origin-when-cross-origin`.

It will send along the origin (`https://pruneyourfollows.com`) but not the full URL (`https://pruneyourfollows.com/app?example=possible-secret`).

## How to set the Referrer-Policy on Gatsby Cloud

To make `strict-origin-when-cross-origin` the policy across the board configure the `gatsby-plugin-gatsby-cloud` like so:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        headers: {
          "/*": ["Referrer-Policy: strict-origin-when-cross-origin"],
        },
      },
    },
  ],
};
```

And voila, I finally saw referrer information from [pruneyourfollows.com](https://pruneyourfollows.com/) to [queen.raae.codes](https://queen.raae.codes/) and vice versa.

[![Fathom analytics dashboard for Prune your follows](referrer-policy.jpg)](https://app.usefathom.com/share/lfdkntld/pruneyourfollows.com)

&nbsp;

All the best,\
Queen Raae

&nbsp;

PS. Since we do not have access to Xata's analytics, we would also like to track clicks on their link on our side, and we'll do that on tonight's treasure hunt [Track outgoing links with Fathom for Prune your follows](https://www.youtube.com/watch?v=SftxLYjW_ZQ).
