---
title: How to set HTML lang with Gatsby in 2023
tags: Gatsby Head API, html lang, seo
---

As of Gatsby v5.5 (January 2023 #2), you can set the HTML language attribute using the Gatsby Head API:

```jsx
// File: src/pages/example.js
export function Head() {
  return (
    <>
      <html lang="en" />
      <title>Hello World</title>
    </>
  );
}

export default function ExamplePage() {
  return (
    <main>
      <h1>Hello World</h1>
    </main>
  );
}
```

If you are coming from Helmet, this is the exact syntax you know and probably love. Unfortunately, this was not possible when Gatsby introduced v4.19 (July 2022 #2), as I experienced [the hard way](/2022-09-06-head-lang/)!

&nbsp;

All the best,\
Queen Raae
