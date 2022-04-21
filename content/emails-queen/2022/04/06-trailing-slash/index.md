---
title: How to fix inconsistent trailing slashes in Gatsby
emojii: ✅ ⚙️
tags: trailing slash, seo, analytics
peeps: monicalent
---

I first learned about the problem of inconsistent trailing slashes from Monica Lent in her article [How to Uncover Non-obvious SEO Mistakes on Gatsby Websites](https://bloggingfordevs.com/gatsby-seo/).

Then I experienced it when seeing "double" entries like "/timeline/" and "/timeline" in my POW! Analytics reports.

!["/timeline/" and "/timeline" rows in the analytics report](./screengrab-fathom.png)

This will happen if your internal links are inconsistent, but also if your internal links are consistently non-trailing slash while your hosting provider redirects from non-trailing to trailing URLs etc.

However, we no longer have to worry about getting it right; instead, you can configure Gatsby to make it consistent.

To do so, add `trailingSlash` to your gatsby-config.js and choose between:

- `always`: Always add trailing slashes to each URL, e.g. /x to /x/.
- `never`: Remove all trailing slashes on each URL, e.g. /x/ to /x.
- `ignore`: Don't automatically modify the URL

I go for `always`!

```js
module.exports = {
  plugins: [
    // ...
  ],
  trailingSlash: "always",
};
```

&nbsp;  
All the best,  
Queen Raae
