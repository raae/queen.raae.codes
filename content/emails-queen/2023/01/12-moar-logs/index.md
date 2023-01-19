---
title: Moar logs with gatsby build/develop --verbose
tags: gatsby, logging
---

Gatsby has its own reporter helper giving us 5 log levels: verbose, info, warn, error and panic.

By default when using `gatsby develop` and `gatsby build` you'll see all but the verbose messages.

But sometimes it can be beneficial to see moar logs, and you can turn on the verbose messages by using the flag `verbose`: `gatsby develop --verbose` or `gatsby build --verbose`.

Enabling verbose logging will for instance give you an overview of your nodes:

```bash
verbose Number of node types: 13. Nodes per type: Directory: 230,
  File: 384, ImageSharp: 159, Landing: 12, MarkdownRemark: 215,
  OlaVeaEmail: 18, QueenEmail: 162, Site: 1, SiteBuildMetadata: 1,
  SitePage: 381, SitePlugin: 67, Talk: 6, TestimonialsYaml: 12
```

&nbsp;

All the best,\
Queen Raae
