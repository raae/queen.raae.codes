---
title: Take the upgraded Gatsby Cloudinary plugins for a spin
---

Taking a tiny break from the summer vacay content hiatus to let you know:

## The upgraded Gatsby Cloudinary plugins are ready for you!

Take'em for a spin on your website.

Support for gatsby-plugin-image and Gatsby v4 support has landed.

The good news is that you don't need to upgrade to Gatsby v4 because we made'em backward compatible with v3 as well.

## How do I get the upgraded Gatsby Cloudinary plugins?

The source plugin has an official new release:

```
yarn add gatsby-source-cloudinary&#64;latest
npm install gatsby-source-cloudinary&#64;latest
```

While the transformer plugin is in beta, we would love it if you took it for a spin; it works with both Gatsby v3 and Gatsby v4:

```
yarn add gatsby-transformer-cloudinary&#64;beta-v4
npm install gatsby-transformer-cloudinary&#64;beta-v4
```

Suppose you are already using gatsby-transformer-cloudinary with existing data. In that case, you might want to start with gatsby-transformer-cloudinary&#64;beta, which has no breaking changes, but the possibility to migrate to gatsby-plugin-image before doing v4 needed changes.

## Backwards compatible plugins

With the gentle guidance of my mentor and senior plugin engineer, I've contributed code and learned a lot. I don't know your favorite learning style, but I am a learning-by-doing kind of junior dev.

I'll share one thing I learned about backward compatibility: the "if-else" statement. That's right! Good old else "if-else" is one thing I used to make gatsby-transformer-cloudinary work with your old Gatsby version. Or work with your new Gatsby version if you've updated it.

This is what I did:

I installed `gatsby-plugin-utils`:

```
npm i gatsby-plugin-utils
```

I followed the Great Gatsby version 4 docs on backward compatible global state: [3. Global state backward compatible](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-source-plugin-from-v3-to-v4/#3-global-state)

```js
// packages/gatsby-transformer-cloudinary/gatsby-node.js

let coreSupportsOnPluginInit = undefined;

try {
  const { isGatsbyNodeLifecycleSupported } = require(`gatsby-plugin-utils`);

  if (isGatsbyNodeLifecycleSupported(`onPluginInit`)) {
    coreSupportsOnPluginInit = "stable";
  } else if (isGatsbyNodeLifecycleSupported(`unstable_onPluginInit`)) {
    coreSupportsOnPluginInit = "unstable";
  }
} catch (error) {
  console.error(`could not check`);
}

const pluginOptions = getPluginOptions();

const initializaGlobalState = ({ reporter }, pluginOptions) => {
  setPluginOptions({ reporter, pluginOptions });
};

if (coreSupportsOnPluginInit === "stable") {
  exports.onPluginInit = initializeGlobalState;
} else if (coreSupportsOnPluginInit === "stable") {
  exports.unstable_onPluginInit = initializeGlobalState;
} else {
  exports.onPreBootstrap = initializeGlobalState;
}
```

## Join our bug-treasure-hunt

When I say learning-by-doing, I mean doing again and again and again. So if you DO run into a bug, please report it. I'd love to look in on my code again; it's great repetition. 😺

&nbsp;

All the best  
Cap'n Ola Vea
