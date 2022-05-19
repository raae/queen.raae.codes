---
title: Dynamic data in your Gatsby Serverless Functions
emojii: 3️⃣ λ
---

How do you get data into a serverless function?

There are three common approaches:

## 1. Using URL Queries

### Demo

- [/api/time-travel-query?city=oslo&year=1624](https://demodatafunctions.gatsbyjs.io/api/time-travel-query?city=oslo&year=1624)

### Documentation

- Gatsby Documentation on [Data formats (including URL Queries)](https://www.gatsbyjs.com/docs/reference/functions/middleware-and-helpers#data-formats)
- Wikipedia article on [Query Strings](https://en.wikipedia.org/wiki/Query_string)

### Serverless Function Code

```js
// File: /api/time-travel-query
// Usage: /api/time-travel-query?city=oslo&year=1624
export default function handler(req, res) {
  const { city, year } = req.query;
  res.send(`You time-travelled to ${city}, in year ${year}`);
}
```

## 2. Using Param Routes

### Demo

- [/api/time-travel-params/oslo/1624](https://demodatafunctions.gatsbyjs.io/api/time-travel-params/oslo/1624)

### Documentation

- Gatsby Documentation on [Dynamic routing (including Param Routes)](https://www.gatsbyjs.com/docs/reference/functions/routing/#dynamic-routing)

### Serverless Function Code

```js
// File: /api/time-travel-params/[city]/[year].js
// Usage: /api/time-travel-params/oslo/1624
export default function handler(req, res) {
  const { city, year } = req.params;
  res.send(`You time-travelled to ${city}, in year ${year}`);
}
```

## 3. Using Http Request Body

### Demo

<form action="https://demodatafunctions.gatsbyjs.io/api/time-travel-body" method="post">
  <p>
    <label htmlFor="year">Year: </label>
    <br/>
    <input
      required
      type="number"
      id="year"
      name="year"
      value="1624"
    />
  </p>
  <p>
    <label htmlFor="city">City: </label>
    <br/>
    <input
      required
      type="text"
      id="city"
      name="city"
      value="Oslo"
    />
  </p>
  <button>Travel</button>
</form>

### Documentation

- Gatsby Documentation on [Data formats (including body params)](https://www.gatsbyjs.com/docs/reference/functions/middleware-and-helpers#data-formats)

### Serverless Function Code

```js
// File: /api/time-travel-body.js
// Usage: {city: "Oslo", year: "2026"} added to request body
export default function handler(req, res) {
  const { city, year } = req.body;
  res.send(`You time-travelled to ${city}, in year ${year}`);
}
```

Check out the full demo code on [GitHub](https://github.com/queen-raae/demo-data-functions) or take it for a spin using [CodeSandbox](https://codesandbox.io/s/demo-data-functions-e9gtq).

&nbsp;  
All the best,  
Queen Raae

**PS:** Yesterday was May 17th, a special day in Norway. [Check out the reason and the fam in our finest on Twitter](https://twitter.com/raae/status/1526811316349984768).
