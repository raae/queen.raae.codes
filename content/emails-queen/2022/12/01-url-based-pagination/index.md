---
title: Url-based (client-side) pagination with Gatsby
tags: client side, gatsby
---

I like to be able to refresh my browser, use the back button or bookmark a page without losing context. So for [Prune your follows](https://pruneyourfollows.com), we already had an URL structure for filters like this:

- [/app/filter/unpopular](https://pruneyourfollows.com/app/filter/unpopular)
- [/app/filter/unfollowed](https://pruneyourfollows.com/app/filter/unfollowed)
- [/app/filter/unpopular](https://pruneyourfollows.com/app/filter/unpopular)

Keeping the selected filter in the URL makes all the use cases mentioned above possible.

The [Gatsby File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/#creating-client-only-routes) does the heavy lifting for us, automagically surfacing the selected filter as a page prop:

```jsx
// File: ./src/pages/app/filter/[...filter].js 👈👈👈

import React from "react";

export default function FilterPage(props) {
  return (
    <main>
      <p>Your selected filter is {props.params.filter}</p>
      {/* OR */}
      <p>Your selected filter is {props.filter}</p>
    </main>
  );
}
```

The path `/app/filter/unfollowed` in the above example prints out "Your selected filter is unfollowed" twice as I wanted to show that the selected filter is available both in `props.filter` and `props.params.filter`.

For pagination, we need to add another level in our file system:

```jsx
// ./src/pages/app/filter/[filter]/[...page].js 👈👈👈

import React from "react";

export default function FilterPage(props) {
  return (
    <main>
      <p>
        Your selected filter is {props.filter}, <br />
        and your selected page is {props.page}
      </p>
    </main>
  );
}
```

- `/app/filter/unpopular` => "Your selected filter is unpopular, and your selected page is"
- `/app/filter/overactive/3` => "Your selected filter is overactive, and your selected page is 3"

BTW: These values are strings (or undefined), so it might be a good idea to convert the `page` into a `pageIndex` right away and add a sensible default:

```jsx
// ./src/pages/app/filter/[filter]/[...page].js

import React from "react";

export default function FilterPage(props) {
  const pageIndex = props.page ? parseInt(props.page) : 0; 👈👈👈
  return (
    <main>
      <p>
        Your selected filter is {props.filter} <br />
        and your selected page is {pageIndex}
      </p>
    </main>
  );
}
```

With the above changes:

- `/app/filter/unpopular` => "Your selected filter is unpopular, and your selected page is 0"

All the best,\
Queen Raae

PS: There is a follow up showing [pagination in tandem with React Query](/emails/2023-01-04-react-query-pagination/)
