const serializeFeed = require("./serialize");

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                url: siteUrl
                description: siteDescription
              }
            }
          }
        `,
        feeds: [
          // All posts
          {
            output: "/posts/rss.xml",
            title: "Posts from Queen Raae & Family",
            match: "^/posts/",
            setup: ({
              query: {
                site: { siteMetadata },
              },
              ...rest
            }) => {
              return {
                ...siteMetadata,
                ...rest,
                site_url: siteMetadata.url + "/posts",
              };
            },
            serialize: ({ query: { site, allPost } }) => {
              return allPost.nodes.map((node) => serializeFeed(node, site));
            },
            query: `{
              allPost(sort: { slug: DESC }) {
                nodes {
                  date
                  slug
                  html
                  title
                  emojii
                  description
                  ogImage
                  disclaimers
                }
              }
            }`,
          },
          // Queen Posts Feed
          {
            output: "/posts/queen.xml",
            title: "Posts from Queen Raae",
            setup: ({
              query: {
                site: { siteMetadata },
              },
              ...rest
            }) => {
              return {
                ...siteMetadata,
                ...rest,
                site_url: siteMetadata.url + "/posts",
              };
            },
            serialize: ({ query: { site, allPost } }) => {
              return allPost.nodes.map((node) => serializeFeed(node, site));
            },
            query: `{
              allPost: allQueenPost(sort: { slug: DESC }) {
                nodes {
                  date
                  slug
                  html
                  title
                  emojii
                  description
                  ogImage
                  disclaimers
                }
              }
            }`,
          },
          // Ola Vea Posts Feed
          {
            output: "/posts/olavea.xml",
            title: "Posts from Cap'n Ola",
            setup: ({
              query: {
                site: { siteMetadata },
              },
              ...rest
            }) => {
              return {
                ...siteMetadata,
                ...rest,
                site_url: siteMetadata.url + "/posts/olavea",
              };
            },
            serialize: ({ query: { site, allPost } }) => {
              return allPost.nodes.map((node) => serializeFeed(node, site));
            },
            query: `{
              allPost: allOlaVeaPost(sort: { slug: DESC }) {
                nodes {
                  date
                  slug
                  html
                  title
                  emojii
                  description
                  ogImage
                  disclaimers
                }
              }
            }`,
          },
        ],
      },
    },
  ],
};
