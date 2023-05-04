---
title: How to properly handle search (query) params in javascript
tags: javascript
brands: Outseta
---

An [Outseta](http://www.outseta.com?via=queen) customer wanted to pass along the UTM search params to the Outseta SignUp widget so that a visitor who came in through `https://example.com?utm_source=facebook&utm_medium=paid_social&utm_campaign=summer_sale` gets attributed to the summer sale paid Facebook ad.

Search, or query params, is the information after the `?` in a URL such as `utm_source=facebook&utm_medium=paid_social&utm_campaign=summer_sale` in our example.

UTM is a set of params commonly used for tracking marketing efforts, but you can add anything here to suit your needs.

I did some quick googling and came over many creative solutions like separating out the search params by splitting on `?` etc.

However, vanilla JS supports this use case out of the box 🤯

```js
const url = new URL(
  "https://example.com?utm_source=facebook&utm_medium=paid_social&utm_campaign=summer_sale"
);

console.log(
  url.searchParams.get("utm_source"),
  url.searchParams.get("utm_medium"),
  url.searchParams.get("utm_campaign")
);

// Output: facebook paid_social summer_sale
```

[`URL` is the constructor](/emails/2022-05-10-new-url/) you should reach for every time you deal with URLs, and the `searchParams` we are accessing here conforms to the [`URLSearchParams` interface with methods such as `has`, `sort`, `getAll` and more](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams).

Never try to deal with URLs yourself; JS got your back!

&nbsp;

All the best,\
Queen Raae
