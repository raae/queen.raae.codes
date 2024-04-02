---
title: A little semantic HTML trick for React components
description: Make the semantic HTML element configurable through the component's props.
emojii: 🧙‍♀️ 🧱
tags: semantic HTML, react, SEO
---

<aside class="notice">

Learn more about 24 Semantic HTML Elements this advent by signing up for [Semantic Advent](https://advent.raae.codes) that will run again in 2024.

</aside>

Semantic HTML is the foundation of a web project. It helps assistive technologies and Google make sense of your site.

What is semantic HTML? `article`, `heading`, `h2`, `aside`, `ul`, `section` etc. all have semantic meaning. It says something about the content inside them. If the content is a stand-alone piece of content, use `article`; if it's a list, use `ul`, and so on. In comparison, `div` and `span` have no semantic meaning.

To lean more about check out [web.dev's article on Semantic HTML](https://web.dev/learn/html/semantic-html/).

Unfortunately, adherence to semantic HTML often gets lost when creating reusable React UI components.

Let's say we make a reusable card component.

It could look something like this:

```jsx
// File: card.js
import React from "react";

export function Card(props) {
  const { children } = props;
  return <div>{children}</div>;
}
```

It makes sense not to give the design of the content (a card) any semantic meaning by using a `div`. However, such a component is very often used semantically.

- As a list of blog posts => `article`
- As a call out in an article => `aside`
- To spice up the design of a paragraph => `p`

We can solve the issue by surrounding the card with the correct semantic element:

```jsx
// File: exmaple.js
import React from "react";
import { Card } from "./card";

export function Example() {
  return (
    <article>
      <p>An introduction</p>
      <aside>
        <Card>
          Something related to the article but a little outside of the normal
          flow.
        </Card>
      </aside>
      <p>More content...</p>
      <p>
        <Card>A paragraph with different styling...</Card>
      </p>
      <p>More content...</p>
    </article>
  );
}
```

But we'll be notified that a `div` is not a valid child of `p`, and the approach feels iffy. At least to me 🤪

## The semantic HTML trick for React components!

<aside class="notice">

- There was an error earlier in the example code caught by [GasimGasimzada on Reddit](https://www.reddit.com/r/reactjs/comments/y19t4k/comment/irx1z7z/?utm_source=reddit&utm_medium=web2x&context=3) Thank you!
- `as` is a better prop name than `element`, as suggested by several [commentators on Reddit](https://www.reddit.com/r/reactjs/comments/y19t4k/comment/irzwyr5/?context=3).

</aside>

Make the semantic HTML element configurable:

```jsx
// File: card.js
import React from "react";

export function Card(props) {
  // 1️⃣ Destructure element and children from props
  const { element, children } = props;

  // 2️⃣ Capitalise element to make it valid jsx
  let Element = element;

  // 3️⃣ Make "div" the default choice
  if (!element) {
    Element = "div";
  }

  return <Element>{children}</Element>;
}
```

Or in shorthand form:

```jsx
import React from "react";

export function Card(props) {
  // Do 1️⃣, 2️⃣, 3️⃣ in one line
  const { element: Element = "div", children } = props;

  return <Element>{children}</Element>;
}
```

You may then use the Card component like so:

```jsx
// File: exmaple.js
import React from "react";
import { Card } from "./card";

export function Example() {
  return (
    <article>
      <p>An introduction</p>

      <Card element="aside">
        Something related to the article but a little outside of the normal
        flow.
      </Card>

      <p>More content...</p>

      <Card element="p">A paragraph with different styling...</Card>

      <p>More content...</p>
    </article>
  );
}
```

Credit where credit is due. I learned how to do this by looking at [MUI's source code](https://github.com/mui/material-ui)!

&nbsp;

All the best,  
Queen Raae
