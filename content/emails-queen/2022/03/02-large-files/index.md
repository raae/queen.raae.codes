---
title: How to weed out large files in your Gatsby project
image: ./tweet-files-answer.png
emojii: 🗃 🖼
---

Sam Larsen Disney asked on Twitter:

[![Is there any way to see which file the gatsby-plugin-sharp.IMAGE_PROCESSING job is currently working on?](./tweet-sharp-question.png)](https://twitter.com/SamLarsenDisney/status/1498675878485807113)

It turns out there is not:

[![Thanks for reaching out! This isn't something we currently support, apologies for any inconvenience. We'd love to gain more context on your use case; what challenges are you currently facing? Thanks again!](./tweet-sharp-answer.png)](https://twitter.com/AskGatsbyJS/status/1498697711134126086)

However, when I have experienced sharp processing hanging, there is always a huge image file hanging around somewhere. Not sure how large is large, but to find your larger files, you can run this query:

```graphql
query MyQuery {
  allFile(sort: { order: DESC, fields: size }) {
    nodes {
      size
      prettySize
      relativePath
    }
  }
}
```

And in doing so myself, I see last year's Christmas card/drawing could be a tad bit smaller 🎄

[![And in doing so myself I see last years christmas card/drawing could be a tad bit smaller 🎄](./tweet-files-answer.png)](https://twitter.com/raae/status/1498705093348241409)

&nbsp;  
All the best,  
Queen Raae
