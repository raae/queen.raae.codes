---
title: How to style `dangerouslySetInnerHTML` with Tailwind
tags: Tailwind, css, react
---

I stumbled on this challenge when working with highlighting for [Prune your Follows](https://pruneyourfollows.com/).

> How to style the `mark` element in the possibly highlighted search result?

Turns out Tailwind has support for [Using arbitrary variants](https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants), but it took me quite a while to find that in the documentation, I'll tell you 🕵️‍♀️

```jsx
const HighlighetResult = () => {
  return (
    <span
      className="[&>em]:bg-amber-300" // 👈👈👈
      dangerouslySetInnerHTML={{
        __html: highlight?.username || record.username,
      }}
    />
  );
};
```

Inside the `[]` in the code example, you may use any regular old css selector! So, for instance, if you are getting content from a third party, you could do `[&>p]`, `[&>img]` etc. The `>` indicates direct descendant; for any `img` you'll need to do `[&_img], the `\_` will be read as a space.

![The resulting styled highlight](./higlighting.png)

&nbsp;

All the best,\
Queen Raae
