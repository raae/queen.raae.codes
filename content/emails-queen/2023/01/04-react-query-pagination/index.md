---
title: React Query pagination with Gatsby (File System Route API)
tags: client side, react query, gatsby
---

For [Prune your follows](https://pruneyourfollows.com), we already had an URL structure for filters like this:

- [/app/filter/unpopular](https://pruneyourfollows.com/app/filter/unpopular)
- [/app/filter/unfollowed](https://pruneyourfollows.com/app/filter/unfollowed)
- [/app/filter/unpopular](https://pruneyourfollows.com/app/filter/unpopular)

But for most filters, there are more than 60 accounts, so we added pagination by:

- Capturing the page number using the Gatsby File System Route API 1️⃣
- Extending the React Query cache key with the page number 2️⃣
- Calculating an offset using the page number 3️⃣
- Passing along the offset with our query for filtered accounts 4️⃣

```jsx
// ./src/pages/app/filter/[filter]/[...page].js 👈👈👈 1️⃣

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function SearchPage(props) {
  const pageIndex = parseInt(props.page) || 0;
  const size = 60;
  const offset = pageIndex * size; //👈👈👈 3️⃣
  const { data } = useQuery({
    queryKey: ["accounts", props.filter, props.page], // 👈👈👈 2️⃣
    queryFn: ({ signal }) =>
      axios.get("/api/accounts", {
        params: {
          size: size,
          filter: props.filter,
          offset: offset, //👈👈👈 4️⃣
        },
        signal: signal,
      }),
    select: (result) => result.data,
  });

  return (
    <ul>
      {(data?.records || []).map((record) => (
        <li key={record.accountId}>
          {record.name} @{record.username}
        </li>
      ))}
    </ul>
  );
}
```

If "capturing the page number using the Gatsby File System Route API" made no sense, then [Url-based (client-side) pagination with Gatsby](/emails/2022-12-01-url-based-pagination/) is for you.

&nbsp;

All the best,  
Queen Raae
