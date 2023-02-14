---
title: How to set HTML lang with Gatsby in 2023
tags: Gatsby Head API, html lang, seo
---

As of Gasby v5.5, you can set the HTML language attribute using the Gatsby Head API:

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

If you are coming from Helmet, this is the exact syntax you know and probably love. Unfortunately, this was not possible when Gatsby introduced vSSS, as I experienced [the hard way](/emails/2022-09-06-head-lang/)!

&nbsp;

All the best,\
Queen Raae
