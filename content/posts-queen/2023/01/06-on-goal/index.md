---
title: How to track outgoing links with Fathom + Gatsby
brands: Fathom, Gatsby Cloud
tags: treasure hunt, analytics
---

So we fixed the [Referrer-Policy](/posts/2023-01-05-referrer-policy/) for [Prune you Follows](https://pruneyourfollows.com) earlier this week, and I started seeing `pruneyourfollows.com` as a referrer of traffic in my Queen Raae Fathom analytics.

[![Traffic coming from Google, Twitter, pruneyourfollows.com, techcrunch.com](./referrer-traffic.png)](https://app.usefathom.com/share/difbaeot/queen.raae.codes)

However, I do not have access to Xata's analytics. We could always ask them for an update every now and then. But it would be nicer to keep an eye on this ourselves.

To do so, I finally finished up this [year-old Pull Request](https://github.com/queen-raae/gatsby-plugin-fathom/issues/2) for `trackGoal` and `trackPageview` support in @raae/gatsby-plugin-fathom.

Then Ola added goal tracking to _all the links_!\
And showed us how on this [week's rum-fueled treasure hunt](https://youtu.be/SftxLYjW_ZQ) 🏴‍☠️

## How to use @raae/gatsby-plugin-fathom

- Create events for the links you would like to track in your Fathom Dashboard 1️⃣
- Upgrade to the latest version of the plugin: `yarn add @raae/gatsby-plugin-fathom@latest` 2️⃣
- Import `useFathom` from @raae/gatsby-plugin-fathom 3️⃣
- Destruct `trackGoal` from the `useFathom` hook 4️⃣
- Track clicks using the correct Event ID 5️⃣

```jsx
import React from "react";
import { useFathom } from "@raae/gatsby-plugin-fathom"; // 3️⃣

export function Footer() {
  const { trackGoal } = useFathom(); // 4️⃣
  return (
    <footer>
      Powered by{" "}
      <a
        onClick={() => {
          trackGoal("GEVKO638", 0); // 5️⃣
        }}
        href="https://xata.io/"
      >
        Xata
      </a>
    </footer>
  );
}
```

All the best,\
Queen Raae
