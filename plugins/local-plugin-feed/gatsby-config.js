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
                url
                description
              }
            }
          }
        `,
        feeds: [
          // All emails
          {
            output: "/emails/rss.xml",
            title: "Emails from Queen Raae and Cap'n Ola",
            match: "^/emails/",
            setup: ({
              query: {
                site: { siteMetadata },
              },
              ...rest
            }) => {
              return {
                ...siteMetadata,
                ...rest,
                site_url: siteMetadata.url + "/emails",
              };
            },
            serialize: ({ query: { site, allEmail } }) => {
              return allEmail.nodes.map((node) =>
                serializeFeed(node, site, { emojii: "⛵ 🔧" })
              );
            },
            query: `
              {
                allEmail(sort: {order: DESC, fields: slug}) {
                  nodes {
                    date
                    slug
                    childMarkdownRemark {
                      excerpt
                      html
                      frontmatter {
                        title
                        emojii
                        description
                      }
                    }
                    ... on QueenEmail {
                      ogImage {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                  }
                }
              }
            `,
          },
          // Queen Emails Feed
          {
            output: "/emails/queen.xml",
            title: "Emails from Queen Raae",
            setup: ({
              query: {
                site: { siteMetadata },
              },
              ...rest
            }) => {
              return {
                ...siteMetadata,
                ...rest,
                site_url: siteMetadata.url + "/emails",
              };
            },
            serialize: ({ query: { site, allEmail } }) => {
              return allEmail.nodes.map((node) => serializeFeed(node, site));
            },
            query: `
              {
                allEmail: allQueenEmail(sort: {order: DESC, fields: slug}) {
                  nodes {
                    slug
                    date
                    childMarkdownRemark {
                      excerpt
                      html
                      frontmatter {
                        title
                        emojii
                        description
                      }
                    }
                    ogImage {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                }
              }
            `,
          },
          // Ola Vea Emails Feed
          {
            output: "/emails/olavea.xml",
            title: "Emails from Cap'n Ola",
            setup: ({
              query: {
                site: { siteMetadata },
              },
              ...rest
            }) => {
              return {
                ...siteMetadata,
                ...rest,
                site_url: siteMetadata.url + "/emails/olavea",
              };
            },
            serialize: ({ query: { site, allEmail } }) => {
              return allEmail.nodes.map((node) =>
                serializeFeed(node, site, { emojii: "⛵ 🔧" })
              );
            },
            query: `
              {
                allEmail: allOlaVeaEmail(sort: {order: DESC, fields: slug}) {
                  nodes {
                    slug
                    date
                    childMarkdownRemark {
                      excerpt
                      html
                      frontmatter {
                        title
                        emojii
                        description
                      }
                    }
                  }
                }
              }
            `,
          },
        ],
      },
    },
  ],
};
