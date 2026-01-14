---
title: Gatsby ImageCDN on Netlify
emojii: 🖼 ☁️
tags: image cdn, pow, images
brands: Netlify
---

The POW! web app is hosted on Netlify, and so is the [soon to be released](https://pow-site.netlify.com/) version of the marketing site.

However, after upgrading to the latest version of [@raae/gatsby-source-youtube-oembed](https://github.com/queen-raae/gatsby-source-youtube-oembed), with support for Gatsby ImageCDN, my sourced YouTube Thumbnails went blank...

Turns out support for Gatsby ImageCDN is not on by default; you need to set the environment variable `GATSBY_CLOUD_IMAGE_CDN` set to `true`.

![GATSBY_CLOUD_IMAGE_CDN=true](./env-var.png)

After doing so and triggering a "Clear cache and deploy site," the YouTube Thumbnails came back, and all was good!

[![YouTube Thumbnail via Gatsby ImageCDN on Netlify](./video-screengrab.png)](https://youtu.be/nS36D2zUkvA).

&nbsp;  
All the best,  
Queen Raae

&nbsp;  
**PS:** Interested in learning how to add Gatsby ImageCDN support to your plugin? Check out [How to add support for Gatsby ImageCDN in your source plugin 🖼 ☁️](/2022-03-25-image-cdn-plugin/)
