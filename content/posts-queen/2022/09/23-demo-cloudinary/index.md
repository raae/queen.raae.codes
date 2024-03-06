---
title: Please include a demo in your Gatsby Plugin repository
emojii: 🖼 📥
tags: plugin, source plugin, treasure hunt
brands: Cloudinary
peeps: colbyfayock
---

Yesterday, Colby Fayock of Space Jelly (and Cloudinary) joined the [unauthorized and rum-fueled treasure hunt](https://youtu.be/IicwkJCNy7k) in the sharky waters around the Gatsby islands 🏴‍☠️

[![Screendump of Ola, me, and Colby laughing with a blurry plush unicorn covering Lillian's face](./screengrab.jpg)](https://youtu.be/IicwkJCNy7k)

Cloudinary is our client. This summer, we upgraded their plugins to work with v4, and these days we are working on an automated release process, `pluginOptionsSchema` validation, clean-up of the documentation ++

## The What?

Add a demo site to the gatsby-source-cloudinary repository

## The Why?

Having a demo and the plugin code in the same repository makes setting up the dev environment a breeze. Even with automated tests in place, it's helpful to see the plugin in action as you develop.

## The How

Make use of [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/). One workspace for the plugin and one for the demo.

- Move the plugin code you already have into its own folder.
  - I like to call it `/plugin`.
- Then add the demo Gatsby site to another folder.
  - I like to call it `/demo`.
- Create a `package.json` in your root that looks like this

```json
{
  "private": true,
  "workspaces": ["plugin", "demo"],
  "scripts": {
    "develop": "yarn workspace demo develop",
    "build": "yarn workspace demo build",
    "serve": "yarn workspace demo serve",
    "clean": "yarn workspace demo clean"
  }
}
```

- Make sure to delete whatever `node_modules` folders you might have
- Run `yarn install` from root

If you have any formatting or test scripts, I like to add those to the root `package.json` as well together with their local dev dependencies.

&nbsp;

Check out the [Pull Request on Github](https://github.com/cloudinary-devs/gatsby-source-cloudinary/pull/41) for the full work on gatsby-source-cloudinary.

All the best,  
Queen Raae

&nbsp;

PS: If you are starting from scratch I recommend you start with my [Gatsby Plugin Starter](https://github.com/queen-raae/gatsby-plugin-starter)
