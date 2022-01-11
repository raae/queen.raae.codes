---
title: Static Site Generation (SSG) with Gatsby
emojii: 🔴 👩‍🏫
---

Static Site Generation (SSG) is Gatsby's default rendering mode.

_SSG is the default rendering mode in Gatsby. While the name has the word “static” in it, it doesn’t at all mean boring or lifeless. It simply means the entire site is pre-rendered into HTML, CSS, and JavaScript at build time, which then get served as static assets to the browser. Because all of that HTML, CSS, and JS is preprocessed and rendered at build time, Static Site Generation serves websites to users in the fastest possible way—your content is ready to go before the visitor even visits the site. ([Gatsby Docs about Rendering Options](https://www.gatsbyjs.com/docs/conceptual/rendering-options/#static-site-generation-ssg))._

[![SSG Diagram](./ssg-diagram.jpg)](https://www.gatsbyjs.com/docs/conceptual/rendering-options/#static-site-generation-ssg)

**But how do we SSG?**

- [Watch the Live Screeencast](https://youtu.be/D_03KW4AkSk)

## SSG with Gatsby three ways

Read more in the [Gatsby Docs about Routing](https://www.gatsbyjs.com/docs/reference/routing/creating-routes/).

### 1. React component in `src/pages`

The file generates a single page with the file's name as the path.

```
// src/pages/demo.js

import React from "react";

const DemoPage = () => {
  return (
    <main>
      <h1>Static Site Generation (SSG)</h1>
    </main>
  );
};

export default DemoPage;
```

- Generates a page at the path `/demo/`.

### 2. File System Route API

The file generates a page for each YouTube node in the data layer with the node's id as the path.

```
// src/{YouTube.id}.js

import React from "react";

const YouTubeFileSystemApiPage = () => {
  return (
    <main>
      <h1>File System Route API Page</h1>
    </main>
  );
};

export default YouTubeFileSystemApiPage;
```

- Generates a page at the path `/u-gq8cn-n-tbw-i/` for the YouTube node with id: `UGq8cnNTbwI`, and similarly for all the other YouTube nodes.

### 3. `createPages` in `gatsby-node.js`

The code generates a page for each YouTube node in the data layer with the node's id as the path using the supplied template. The template will be a file very similar to the file examples above.

```
// gatsby-node.js

const path = require(`path`);

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;

  const result = await graphql(`
    {
      allYouTube {
        nodes {
          id
        }
      }
    }
  `);
  const templatePath = path.resolve(`./src/templates/youtube-template.js`);

  result.data.allYouTube.nodes.forEach((node) => {
    createPage({
      path: node.id,
      component: templatePath,
      context: {
        id: node.id,
      },
    });
  });
};
```

- Generates a page at the path `/UGq8cnNTbwI/` for the YouTube node with id: `UGq8cnNTbwI`, and similarly for all the other YouTube nodes.

Notice how the path here is a little different; `/UGq8cnNTbwI/` vs `/u-gq8cn-n-tbw-i/`.

The File System Route API will run the id through the @sindresorhus/slugify package before using it as a path. While with `createPage` we are responsible for making unique and valid paths ourselves.

## Content from the Gatsby Data Layer

You can, and probably want to, sprinkle in content from the Gatsby Data Layer for all three ways of creating SSG pages. The Gatsby Data Layer holds all the data sourced at build time, making the content available when the site is statically generated.

The typical example would be to query for the YouTube Content Node corresponding to the page created:

```
// src/{YouTube.id}.js
// src/templates/youtube-template.js

import React from "react";
import {graphql} from "gatsby";

const YouTubePage = ({data}) => {
  const {title} = data.youTube;
  return (
    <main>
      <h1>{title}</h1>
    </main>
  );
};

export const query = graphql`
  query ($eq: String) {
    youTube(id: {eq: $eq}) {
      title
    }
  }
`;

export default YouTubePage;
```

But you can also query for content for pages created as Rect Components in `src/pages`:

```
// src/pages/demo.js

import React from "react";
import {graphql, Link} from "gatsby";

const DemoPage = ({data}) => {
  return (
    <main>
      <h1>Static Site Generation (SSG)</h1>

      {data.allYouTube.nodes.map((node) => {
        return (
          <Link to={node.id} key={node.id}>
            <img alt={node.title} src={node.thumbnail_url} />
          </Link>
        );
      })}
    </main>
  );
};

export const query = graphql`
  {
    allYouTube {
      nodes {
        id
        title
        thumbnail_url
      }
    }
  }
`;

export default DemoPage;
```

Oh boy, this was longer and more difficult to demo than I imagined. If you have any questions, reply or add them as a comment [on the video](https://youtu.be/D_03KW4AkSk).

&nbsp;  
All the best,  
Queen Raae

&nbsp;  
**PS:** In the sharky waters around the Gatsby islands we call the File System Route API pages for parrot pages 🦜 More on that later!
