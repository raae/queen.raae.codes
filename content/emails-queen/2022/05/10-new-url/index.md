---
title: How to properly handle URLs in javascript
emojii: 🔗 ✨
tags: javascript, snippet
---

When [scraping Crowdcast](/emails/2022-05-06-scrapingbee/) for webinars to add to the Gatsby Data Layer last week we got back some funny looking paths:

```
/e/gatsby-gotchas-react/register?utm_source=profile&utm_medium=profile_web&utm_campaign=profile`
```

The search params, i.e.: `utm_source`, `utm_medium` etc. should be removed and the path should be transformed into an absolute URL.

We could split the string on `?` and add `https://www.crowdcast.io`, but we can also reach for the Javascript's built-in URL constructor:

```js
const base = "https://www.crowdcast.io/";
const path =
  "/e/gatsby-gotchas-react/register?utm_source=profile&utm_medium=profile_web&utm_campaign=profile";

const url = new URL(path, base);
```

Using the URL constructor results in a very useful object describing our URL:

```js
{
  href: 'https://www.crowdcast.io/e/gatsby-gotchas-react/register?utm_source=profile&utm_medium=profile_web&utm_campaign=profile',
  origin: 'https://www.crowdcast.io',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.crowdcast.io',
  hostname: 'www.crowdcast.io',
  port: '',
  pathname: '/e/gatsby-gotchas-react/register',
  search: '?utm_source=profile&utm_medium=profile_web&utm_campaign=profile',
  searchParams: URLSearchParams {
    'utm_source' => 'profile',
    'utm_medium' => 'profile_web',
    'utm_campaign' => 'profile' },
  hash: ''
}
```

To get a "clean" URL add `origin` and `pathname` together:

```js
const cleanUrl = url.origin + url.pathname;
```

You should reach for the URL constructor anytime you need to work on a URL!

Notice, for instance, how it gracefully handled a trailing slash for `base`. String concatenation `base + path` in this case would result in an invalid URL with a double slash:

```
https://www.crowdcast.io/e//gatsby-gotchas-react/register?utm_source=profile&utm_medium=profile_web&utm_campaign=profile
```

&nbsp;  
All the best,  
Queen Raae
