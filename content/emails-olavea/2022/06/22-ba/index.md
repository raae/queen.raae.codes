---
title: Take the upgraded Gatsby Cloudinary plugins for a spin
---


## The upgraded Gatsby Cloudinary plugins are ready for you!

Take'em for a spin on your website. The good news is that you don't need to upgrade your Gatsby version. Because we made'em backwards compatible.

## How do I get the upgraded Gatsby Cloudinary plugins?

Go and see the recipe in the BETA pull request


[Here is the BETA pull request](https://github.com/cloudinary-devs/gatsby-transformer-cloudinary/pull/173)

## Backwards compatible plugins

With the gentle guidance of my mentor and senior plugin-engineer I've contributed code and learned a lot. I don't know what your favourite learning style is, but I am a learning-by-doing kind of junior-dev. I'll share one thing I learned about backwards compatiblility, else if statement. That's right! Good old  else if is one thing I used to make gatsby-transformer-cloudinary work with your old Gatsby version. Or work with your new Gatsby version if you've updated.

This is what I did:


I installed `gatsby-plugin-utils`

```shell

npm i gatsby-plugin-utils

```

I followed the Great Gatsby version 4 docs on backwards compatible global state

[3. Global state backwards compatible](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-source-plugin-from-v3-to-v4/#3-global-state)


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

const initializaGlobalState = ({ reporter }, pluginOptions ) => {
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

When I say learning-by-doing, I mean doing again and again and again. So if you DO run into a bug please report it. I'd love to look in on my code again, it's great repetition. 😺

## Check out the Great Gatsby docs on backwards compatible global state

[3. Global state backwards compatible](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-source-plugin-from-v3-to-v4/#3-global-state)


All the best

Captain Ola Vea