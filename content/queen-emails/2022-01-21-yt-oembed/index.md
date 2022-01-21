---
title: Source YouTube videos in Gatsby without a plugin nor a YT API Key
emojii: 🔴 🏴‍☠️
---

In yesterday's unauthorized and rum-fueled treasure hunts in the sharky waters around the Gatsby islands, we looked closely at [sourcing content nodes](https://youtu.be/VhrOe0X_oA8) with data from the YouTube oEmbed endpoint.

[oEmbed](https://oembed.com/) is likely one of the most underappreciated concepts of the open web. I first encountered it when WordPress added support back in my uni days; let's just say it been awhile 👵

A simple yet powerful concept that I think would benefit from more awareness.

**Have you heard about or used oEmbed before?**

## oEmbed Examples

A provider: YouTube, SoundCloud, Issuu, Flickr, or your blog provides an oEmbed endpoint that accepts at a minimum an URL and returns embeddable content in return.

A GET request to `https://www.flickr.com/services/oembed/?url=http://www.flickr.com/photos/bees/2341623661/` returns:

```json
{
  "version": "1.0",
  "type": "photo",
  "width": 240,
  "height": 160,
  "title": "ZB8T0193",
  "url": "http://farm4.static.flickr.com/3123/2341623661_7c99f48bbf_m.jpg",
  "author_name": "Bees",
  "author_url": "http://www.flickr.com/photos/bees/",
  "provider_name": "Flickr",
  "provider_url": "http://www.flickr.com/"
}
```

Or more interestingly in our case, a GET Request to `https://www.youtube.com/oembed/?url=https://youtu.be/Bk1jonYPFD4` returns:

```json
{
  "title": "Celebrating POW! (usepow.app)  \u00b7  A day in my life as a developer, founder and mom  \u00b7  March 2021",
  "author_name": "Queen Raae",
  "author_url": "https://www.youtube.com/c/QueenRaae",
  "type": "video",
  "height": 113,
  "width": 200,
  "version": "1.0",
  "provider_name": "YouTube",
  "provider_url": "https://www.youtube.com/",
  "thumbnail_height": 360,
  "thumbnail_width": 480,
  "thumbnail_url": "https://i.ytimg.com/vi/Bk1jonYPFD4/hqdefault.jpg",
  "html": "\u003ciframe width=\u0022200\u0022 height=\u0022113\u0022 src=\u0022https://www.youtube.com/embed/Bk1jonYPFD4?feature=oembed\u0022 frameborder=\u00220\u0022 allow=\u0022accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\u0022 allowfullscreen\u003e\u003c/iframe\u003e"
}
```

Take note of `html` on the YouTube response; it's all you need to embed a YouTube player to your site.

## Sourcing nodes with oEmbed data

In Gatsby land, we can use oEmbed to ensure we have the correct embed snippet and/or the current title for our YouTube videos.

We do so by using the `gatsby-node.js` hook `sourceNodes` where we create one content node per YouTube video and add the information from the oEmbed endpoint onto the node.

```js
// gatsby-node.js
// Full code without error handling

const axios = require("axios");

const YOUTUBE_IDS = ["Bk1jonYPFD4", "TzJfepDjpzM"];

const fetchEmbed = async (id) => {
  const ytUrl = `https://youtu.be/${id}`;
  const { data } = await axios.get("https://www.youtube.com/oembed", {
    params: {
      url: ytUrl,
    },
  });
  return data;
};

const prepYouTubeNode = async (
  id,
  { actions: { createNode }, createNodeId, createContentDigest }
) => {
  const embedData = await fetchEmbed(id);

  createNode({
    id: createNodeId(`you-tube-${id}`),
    oEmbed: embedData,
    internal: {
      type: `YouTube`,
      contentDigest: createContentDigest(embedData),
    },
  });
};

exports.sourceNodes = async (params) => {
  await Promise.all(YOUTUBE_IDS.map((id) => prepYouTubeNode(id, params)));
};
```

**Would you like to see this code refactored into a plugin?**

&nbsp;  
All the best,  
Queen Raae

&nbsp;  
**PS:** The Pirate Princess and I woke up in this [magical tree top hut](https://twitter.com/OlaHolstVea/status/1483819055584878593) today...
