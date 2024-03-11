---
title: Remote Astro Collections (sort of)
tags: Astro, Transistor, Data Fetching, Build Time
projects: Data in the Wild, Two Week Build
---

After adding the "most popular" episodes section to [our Astro podcast website](https://github.com/olavea/Our-podcast-websites) the local DX took a nose dive!

Building the home page took 3789ms, that's almost 4 seconds 🤦‍♀️

Fetching all the analytics data from the Transistor API, looping through and calculating the total download numbers for each episode, and then sorting the episodes by popularity takes time.

- We could probably optimize the code, but it would still slow down the build.
- We could skip picking out the most popular episodes in development, but then it be hard to design that section.

And neither would solve the issue that fetching the data from the Transistor API also needs to happen in the single episode page template (`/src/pages/episodes/[slug].astro`) and the paginated archive pages (`/src/pages/episodes/[...page].astro`).

At this point, I really missed the Gatsby Data Layer 😢 I deep-dived into the Astro Collection docs hoping I'd missed the option to source remote data as an Astro Collection. I had not, but I did notice Astro collection can be of type `data`, meaning .json or .yml files in addition to type `content` meaning .md, .mdx and .markdoc files.

So I decided to explore fetching all the data, and calculating the total download numbers, ahead of time! Writing the response from the Transistor API as .json files to disk; one for each episode.

```js
import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { fetchAllEpisodes, fetchAllEpisodeAnalytics } from "./transistor.js";

try {
  const DIR = join(process.cwd() + "/src/content/episodes/");

  const episodeData = await fetchAllEpisodes();
  const episodeAnalytics = await fetchAllEpisodeAnalytics();

  const episodeFilePromises = episodeData.map((episode) => {
    const analytics = episodeAnalytics.attributes.episodes.find((a) => {
      return parseInt(a.id) === parseInt(episode.id);
    });

    const totalDownloads = analytics.downloads.reduce(
      (acc, day) => acc + day.downloads,
      0
    );

    return writeFile(
      join(DIR + `/${episode.id}.json`),
      JSON.stringify(
        {
          ...episode.attributes,
          totalDownloads,
        },
        null,
        2
      )
    );
  });

  const files = await Promise.all(episodeFilePromises);
  console.log(`Episode entries written ${files.length} to ${DIR}.`);
} catch (error) {
  console.error(error);
}
```

**And holy moly, it worked!**\
Build time for the home page went from 3789ms to 148ms 🎉🎉🎉

In addition to the build time improvement, I also got the added benefit of Astro's built-in collection validation. I decided to skip typescript for the data fetching code above, and rather rely on the collection schema to catch any errors.

```js
import { defineCollection, z } from "astro:content";

const episodeCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    totalDownloads: z.number(),
    description: z.string(),
    embed_html: z.string(),
    // and more as we build out the site
  }),
});

export const collections = {
  episodes: episodeCollection,
};
```

My gut feeling is that we'll see support for remote collection in Astro pretty soon, but for now, I'm happy with the solution I've come up with.

Let me know if you have any questions or suggestions for improvements. I'm [@raae](https://twitter.com/raae) on Twitter.
