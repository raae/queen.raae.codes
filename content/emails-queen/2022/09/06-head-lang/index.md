---
title: The Gatsby Head API cannot set the language attribute on the html tag
emojii: 💀 ⚠️
tags: Gatsby Head API, html lang, seo
---

Last week we migrated from React Helmet to the new Gatsby Head API on our [unauthorized and rum-fueled treasure hunt](/emails/2022-09-02-head-api/).

It was surprisingly straightforward as my existing use of React Helmet used their newest style,

```js
// File: src/components/page-head.js

import React from "react";
import { Helmet } from "react-helmet";

export default function PageHead(props) {
  const { location, title } = props;
  const canonical = `${siteUrl}${location.pathname}`;
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
```

and that is the same structure expected by the Gatsby Head API as well, just without the `Helmet` wrapper.

```js
// File: src/components/page-head.js

import React from "react";

export default function PageHead(props) {
  const { location, title } = props;
  const canonical = `${siteUrl}${location.pathname}`;
  return (
    <>
      <html lang="en" /> // Read below before copying this line!!!
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
    </>
  );
}
```

```js
// File: src/pages/example.js

import React from "react";
import PageHead from "../components/

export function Head(props) {
  return <PageHead {...props} />;
}

export default function ExamplePage() {
  return <div>Hello World</div>;
}
```

But with some tiny differences that I did not pick up on until I actually read the documentation a little more closely after the stream 🤦‍♀️

The Gatsby Head API only messes with the `head` element, while ReactHelmet also lets you mess with the `html` and `body` attributes.

Meaning my use of `<html lang="en">` above was silently ignored 😱

To add the language attribute back in, I had to reach for the `onRenderBody` lifecycle hook:

```js
// File: gatsby-ssr.js

import React from "react";

export const onRenderBody = (gatsbyUtils) => {
  const { setHtmlAttributes } = gatsbyUtils;

  setHtmlAttributes({ lang: "en" });
};
```

There is also a `setBodyAttributes` utils to use if your original use of React Helmet sets body attributes you would like to keep around.

&nbsp;

All the best,  
Queen Raae
