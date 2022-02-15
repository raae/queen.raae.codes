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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) =>
                serializeFeed(node, site, { emojii: "⛵ 🔧" })
              );
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {parent: {internal: {type: {glob: "*Email"}}}}
                  sort: {fields: fields___date, order: DESC}
                ) {
                  nodes {
                    parent {
                      ... on QueenEmail {
                        date
                        slug
                        ogImage {
                          childImageSharp {
                            gatsbyImageData(formats: NO_CHANGE)
                          }
                        }
                      }
                    }
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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) =>
                serializeFeed(node, site)
              );
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {parent: {internal: {type: {eq: "QueenEmail"}}}},
                  sort: {fields: fields___date, order: DESC}
                ) {
                  nodes {
                    parent {
                      ... on QueenEmail {
                        date
                        slug
                        ogImage {
                          childImageSharp {
                            gatsbyImageData(formats: NO_CHANGE)
                          }
                        }
                      }
                    }
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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) =>
                serializeFeed(node, site, { emojii: "⛵ 🔧" })
              );
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {parent: {internal: {type: {eq: "OlaVeaEmail"}}}},
                  sort: {fields: fields___date, order: DESC}
                ) {
                  nodes {
                    parent {
                      ... on OlaVeaEmail {
                        date
                        slug
                      }
                    }
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
            `,
          },
        ],
      },
    },
  ],
};
