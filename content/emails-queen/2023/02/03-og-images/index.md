---
title: Is 1200 x 630px the holy grail?
tags: open graph, og image
---

We finally added an open graph image on last week's [unauthorized and rum-fueled treasure hunt](https://www.youtube.com/watch?v=tBY3OjlRe2M), so the URL looks nice when shared on social media.

[![Screengrab from stream](./screengrab.jpg)](https://www.youtube.com/watch?v=tBY3OjlRe2M)

We ended up being super confused by the size requirements, but 1200 x 630px seems to be the holy grail of these images. The size works across Twitter, LinkedIn and Facebook.

Let me know if I am wrong, please!

Both LinkedIn and Facebook require a meta tag with `property` set to `og-image`:

```jsx
<meta property="og:image" content={imageUrl} />
```

While Twitter requires a meta tag with `name` set to `twitter:image` in addition to information about the style of the "sharing card":

```jsx
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content={imageUrl} />
```

&nbsp;

All the best,\
Queen Raae
