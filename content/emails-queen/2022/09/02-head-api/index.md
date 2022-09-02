---
title: Migration from React Helmet to the new Head API
emojii: 👤 💀
tags: React Helmet, Head API, meta tags, SEO
---

We had so much fun on yesterday's [unauthorized and rum-fueled treasure hunt](https://youtu.be/Zyeuj7I7A50) in the sharky waters around the Gatsby islands 🎉

[![Stream Screendump](./screendump.jpg)](https://youtu.be/Zyeuj7I7A50)

## The What?

We migrated from React Helmet to the new [React Head API](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/).

## The Why?

It's always nice to get rid of dependencies, and I have seen some very intermitted issues with missing meta tags on a few pages, as reported by [ahrefs](https://ahrefs.com/). Hopefully, that will be a thing of the past after the migration.

## The How

We made sure to enable migrating one page at a time instead of migrating it all at once. Experience has taught me the perils of the latter approach.

So we cloned the existing `SEO` component, named it `PageHead,` and replaced the `Helmet` wrapper with a fragment `<>...</>`.

We then returned the new `PageHead` component from the named export `Head` in the page template.

The new Head API asks you to export a named component called `Head.` Similar to how Gatsby picks up the default export as the content to inject into the `body` element, the named export `query` as the page query, it now also picks up the named export `Head` as content to inject into the `head` element.

## The Code

```js
// File: {Email.slug}.js
import PageHead from "../components/page-head";
import EmailTemplate from "../components/email-template";

export function Head({ data, ...props }) {
  const { title, description } = data.email || {};
  return (
    <PageHead
      {...props}
      meta={{
        title: title,
        description: description,
      }}
    />
  );
}

export default function EmailPage({ data, ...props }) {
  return <EmailTemplate {...data.email} {...props} />;
}

export const query = graphql`
  query EmailById($id: String!) {
    email(id: { eq: $id }) {
      // ... the query
    }
  }
`;
```

Check out the [Pull Request on Github](https://github.com/raae/queen.raae.codes/pull/126) to view the full refactor we did on stream.

&nbsp;

All the best,  
Queen Raae
