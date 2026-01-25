---
title: Exploring React Component testing with Gatsby
emojii: ✅ 🛑
---

We talked [POW! Positioning](https://youtu.be/hzZOkTAvE8M?t=3925) with Slow Business Torill (@fjellflyt) and explored React Component testing in yesterday's unauthorized and rum-fueled [treasure hunt](https://youtu.be/hzZOkTAvE8M) in the sharky waters around the Gatsby islands.

The POW! app already has tests for some of the business logic but no tests for the user interface. I want to change that.

To get started, we explored adding components tests to the new POW! Marketing site Ola is working on.

As before, when it comes to testing with Gatsby, we followed the [Gatsby Unit Testing Guide](https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/).

After exploring on stream and some work this morning, I decided on a strategy to test the pages' semantic structure and make sure the page will render even when content is missing or incomplete.

## Does the page render without content?

```js
// {MarkdownRemark.fields__slug}.test.js

import React from "react";
import { create } from "react-test-renderer";
import Page from "./{MarkdownRemark.fields__slug}";

describe("without content", () => {
  const root = create(<Page />).root;
  it("renders", () => {
    expect(root).toBeDefined();
  });
});
```

## Does the page render correct semantic HTML for the content?

```js
// {MarkdownRemark.fields__slug}.test.js

import React from "react";
import { create } from "react-test-renderer";
import Page from "./{MarkdownRemark.fields__slug}";

describe("with typical content", () => {
  const root = create(
    <Page
      data={{
        markdownRemark: {
          frontmatter: {
            title: "Page title",
          },
        },
      }}
    />
  ).root;

  it("uses h1 for page title", () => {
    const h1Element = root.findByType("h1");

    expect(h1Element).toBeDefined();
    expect(h1Element.props.children).toBe("Page title");
  });
});
```

## Does NOT render HTML elements for missing content?

```js
// {MarkdownRemark.fields__slug}.test.js

import React from "react";
import { create } from "react-test-renderer";
import Page from "./{MarkdownRemark.fields__slug}";

describe("with missing title content", () => {
  const root = create(
    <Page
      data={{
        markdownRemark: {
          frontmatter: {},
        },
      }}
    />
  ).root;

  it("has no empty h1 for missing page title", () => {
    const checkForElement = () => {
      root.findByType("h1");
    };

    expect(checkForElement).toThrow();
  });
});
```

I hope some of these examples make it easier for you to get started!

&nbsp;  
All the best,  
Queen Raae

**PS:** Read a great article on test strategy? Send it my way!
