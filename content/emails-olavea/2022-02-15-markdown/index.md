---
title: I created a Link with markdown on our POW!-website
---

## My Sunday Skill Builder Session:

This Sunday, I created a `Link` with markdown on our POW!-website.

## What did I do?

I created a `Link` with markdown.

## Why did I do it?

I want to use markdown as my Content Management System (CMS) because it's my favorite CMS and Queen Raae told me to use markdown.

## How did I do it?

I started out on my L.O.V.E. acronym.

`L.` Link and path and label  
`O.` Open up in GraphiQL  
`V.` Variable  
`E.` Evol is love backward, no just kidding. I will do «E. Empty» on this Sunday's Skill Builder Session.

### L.

Link and path and label

```js
// POW!-website / pages / {MarkdownRemark.fields__slug}.js
<Link to={}>{}</Link>

// POW!-website / content / index / index.md

---
....
    cta:
      path: /signup
      label: Yes to privacy
---
....
```

### O.

Open up in GraphiQL

```js
// POW!-website / pages / {MarkdownRemark.fields__slug}.js
export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        sections {
          cta {
            path
            label
          }
        }
      }
    }
  }
`;
```

### V.

First I make the variable:

```js
// POW!-website / pages / {MarkdownRemark.fields__slug}.js
const { path, label } = section.cta;
```

Then I use the variable:

```js
<Link to={path}>{label}</Link>
```

```js
// POW!-website / pages / {MarkdownRemark.fields__slug}.js
import React from "react";
import { graphql, Link } from "gatsby";

const ComponentName = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, sections } = frontmatter;

  return (
    <>
      <div className="container">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {(sections || []).map((section) => {
          const { title } = section;
          const { html } = section.body.childMarkdownRemark || {};
          const { path, label } = section.cta || {};
          return (
            <section>
              <h2>{title}</h2>
              {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
              {path && <Link to={path}>{label}</Link>}
            </section>
          );
        })}
      </div>
    </>
  );
};

export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        sections {
          cta {
            path
            label
          }
          title
          body {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;

export default ComponentName;
```

&nbsp;  
For the long version, watch [Sunday's OlaCast](https://youtu.be/rPiQi_bOk8s) on YouTube.

&nbsp;  
💪😺👍  
Keep your skill-builder-ship afloat this week!  
⛵🔧🏴‍☠️

Ola Vea  
Cap'n of his own skill-builder-ship
