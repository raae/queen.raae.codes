---
title: Let's redirect within the app on button clicks/taps
emojii: 🖱 👆
tags: pow, createRedirect, gatsby-node.js
---

This week I gave Ola this task:

- Redirect from "/signup" to "my.usepow.app/signup"

He went forth and used `createRedirect`, but it was not working when using the "Get Started" button on usepow.app. A button that is actually a link to "/signup".

[![Screenshot of the POW! Site header with the "Get Started" button](usepow-button.png)](https://usepow.app)

However, it did not work as expected, I reviewed the code, and it was exactly like I would have solved it.

```js
// gatsby-node.js
exports.createPages = async ({ actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: "/signup/",
    toPath: "https://my.usepow.app/signup",
  });
};
```

After some careful investigation, I realized it worked when hitting `usepow.app/signup` directly, but not when using the button 🧐

So I had another look at the documentation, and I got what `redirectInBrowser` is meant for 🤪

```js
// gatsby-node.js
exports.createPages = async ({ actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: "/signup/",
    toPath: "https://my.usepow.app/signup",
    redirectInBrowser: true, // 👈👈👈
  });
};
```

> ...set redirectInBrowser to true and Gatsby will handle redirecting in the client as well...
> <cite>[Gatsby Docs](https://www.gatsbyjs.com/docs/reference/config-files/actions/#createRedirect)</cite>

&nbsp;  
All the best,  
Queen Raae

**PS:** [POW!](usepow.app) is our privacy-first menstrual cycle journal. If you see talk about period trackers selling data, please point folks towards POW!
