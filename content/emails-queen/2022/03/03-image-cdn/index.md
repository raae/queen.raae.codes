---
title: I was super excited, but it seems the "Gatsby Image CDN Beta" does not support gatsby-source-filesystem (yet...)
emojii: 🖼 ☁️
---

Yesterday's email was quite on the nose when it came to one of GatsbyConf's big reveals: Image CDN.

With Gatsby Image CDN transformations of images are moved from the build to on-demand, waiting for the sharp transformations a thing of the past.

Personally, I never got around to setting up Cloudinary or Imgix and have enjoyed the ease of using `gatsby-plugin-image`.

However, I am planning on sourcing more of my existing content (like the YouTube streams) into queen.raae.codes, and not having to wait around for all those images transforming would be awesome.

But alas, the beta so far is only for images sourced with `gatsby-source-contentful` and `gatsby-source-wordpress`.

Unfortunately my site is markdown based using `gatsby-source-filesystem`, so no experimentation for me yet 😢

I will, of course, investigate to figure out how we as developers may add support in our custom source plugins.

- Read the full Gatsby Image CDN announcement on [Gatsby Blog](https://www.gatsbyjs.com/blog/image-cdn-lightning-fast-image-processing-for-gatsby-cloud/)

&nbsp;  
All the best,  
Queen Raae

**PS:** I am thinking of creating a course/bootcamp on developing and releasing Gatsby Plugins. Would that be of interest to you?
