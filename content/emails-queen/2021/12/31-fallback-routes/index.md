---
title: Server Side Rendered (SSR) fallback routes with Gatsby
emojii: 🎇 ∞
tags: SSR, SSG, getServerData,
---

The unauthorized and rum-fueled treasure hunts in the sharky waters around the Gatsby islands Conference Buddy edition is back.

And on [yesterday's stream](https://youtu.be/d834JE_bFog) helping Mirjam source conference data from Supabase, we briefly touched on fallback routes.

[![Screengrab of the intro](./yt-screenshot.jpg)](https://youtu.be/d834JE_bFog)

## What are fallback routes?

It's a way to render pages for data that Gatsby does not yet sourced.

In Mirjam's case with Conference Buddy there will be a period between a user submits a conference and a fresh build picks up the conference for static generation.

In that interim time, we can rely on fallback routes using either CSR (Client Side Rendering) or SSR (Server Side Rendering).

I was not sure if SSR fallback route would be allowed, so I spun up a contrived demo using SSG (Static Site Generation) for sourced YouTube videos and SSR for non-sourced YouTube videos.

The Gatsby docs does not mention SSR for fallback routes, but it builds and serves locally on my machine. However I must admit I have not yet tested deployment...

### SSG Page Code

```js
// src/pages/yt/{youTubeEmbed.id}.js

import React from "react";
import { graphql } from "gatsby";

import VideoLayout from "../../components/video-layout";

const SSGVideoPage = ({ data }) => {
  return <VideoLayout {...data.youTubeEmbed} />;
};

export default SSGVideoPage;

export const query = graphql`
  query ($id: String) {
    youTubeEmbed(id: { eq: $id }) {
      title
      html
    }
  }
`;
```

### Fallback SSR Page Code

```js
// src/pages/yt/[youTubeId].js

import React from "react";

import { fetchEmbed } from "../../services/oembed";
import VideoLayout from "../../components/video-layout";
import NotFoundPage from "../404";

const SSRVideoPage = ({ serverData }) => {
  if (serverData) {
    return <VideoLayout {...serverData} />;
  } else {
    return <NotFoundPage />;
  }
};

export default SSRVideoPage;

export async function getServerData({ params }) {
  console.log("SERVER SIDE RENDERING Page for ", params.youTubeId);

  const embedData = await fetchEmbed(params.youTubeId, console);

  return {
    props: embedData,
  };
}
```

## Links

- Gatsby's official documentation on [Fallback Routes](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/#collection-route--fallback)
- The contrived example on [CodeSandbox](https://codesandbox.io/s/demo-ssr-fallback-route-9pteu?file=/src/pages/index.mdx) (CodeSandbox is a little buggy with Gatsby so give it some time/reloads if its messing up...)

&nbsp;  
Have you ever used fallback routes in a real-world project?

&nbsp;  
All the best,  
Queen Raae

&nbsp;  
**PS:** Godt Nytt År (Happy New Year) 🎇
