---
title: When to use GATSBY_
tags: env var, environment variables
brands: Gatsby
---

Use `GATSBY_` for environmental variables (env vars) you use in your client-side code. In practice, that would be almost all of your code. The exceptions are code inside `gatsby-node.js`, `gatsby-config.js`, and a page's `getServerData` or `config`.

Exposing all env vars on the client would be a major security hazard. We use env vars for things such as API secrets, etc.

```
XATA_API_KEY=xau_werIJslsdf8wekfsflr06ZxzyYYVpsMF6
GATSBY_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
```

&nbsp;

All the best,\
Queen Raae
