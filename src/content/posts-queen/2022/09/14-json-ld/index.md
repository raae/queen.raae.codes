---
title: Add structured data (JSON-LD) with the Gatsby Head API
emojii: 🗂 👤
tags: seo, JSON-LD, Gatsby Head API
---

How do you add structured data to your Gatsby site? With a little help from good old `JSON.stringify()` and the [Gatsby Head API](/2022-09-02-head-api/)!

1. Create the schema as an object
2. Stringify the schema object
3. Add to the `head`

```js
// File: src/pages/{Email.slug}.js
import React from "react";
import { graphql, Link } from "gatsby";

export function Head({ data }) {
  const { ogImagePath, title, dateISO } = data.email || {};
  const { siteMetadata } = data.site || {};

  // 1️⃣ Create the schema as an object
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: [`${siteMetadata.siteUrl}${ogImagePath}`],
    datePublished: dateISO,
    author: [
      {
        "@type": "Person",
        name: "Benedicte Raae",
        sameAs: "https://twitter.com/raae",
      },
    ],
  };

  // 2️⃣ Stringify the schema object (adding the "null, 2" gives you readable json)
  const schemaAsString = JSON.stringify(schema, null, 2);

  return (
    <>
      <title>{title}</title>
      {/* ... meta tags */}
      {/* 3️⃣ Add to the head */}
      <script type="application/ld+json">{schemaAsString}</script>
    </>
  );
}

export default function EmailPage({ data }) {
  const { title, date, dateISO, html } = data.email || {};
  return (
    <main>
      <h1>{title}</h1>
      <time datetime={dateISO}>{date}</time>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}

export const query = graphql`
  query BlogById($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    email(id: { eq: $id }) {
      title
      date(formatString: "MMMM Do, YYYY")
      dateISO: date
      html
      ogImagePath: ogImage
    }
  }
`;
```

If you are not familiar with structured data or JSON for Linking Data (JSON-LD) I recommend reading through [Understand how structured data works](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data) by Google.

&nbsp;

All the best,  
Queen Raae
