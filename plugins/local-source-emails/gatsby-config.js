const path = require("path");

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `QueenEmail`,
        path: path.join(__dirname, "..", "..", "/content/queen-emails"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `OlaVeaEmail`,
        path: path.join(__dirname, "..", "..", "/content/olavea-emails"),
      },
    },
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
          // Queen Emails Feed
          {
            output: "/emails/rss.xml",
            title: "Emails from Queen Raae",
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
            serialize: ({ query: { site, allQueenEmails } }) => {
              return allQueenEmails.nodes.map((node) => {
                const post = node.childMarkdownRemark;
                const ogGatsbyImage = getImage(post.ogImage);
                return Object.assign({}, post.frontmatter, {
                  title: `${post.frontmatter.emojii} ~ ${post.frontmatter.title}`,
                  description: post.excerpt,
                  date: post.fields.date,
                  url: site.siteMetadata.url + post.fields.slug,
                  guid: site.siteMetadata.url + post.fields.slug,
                  enclosure: {
                    url:
                      site.siteMetadata.url +
                      ogGatsbyImage?.images?.fallback?.src,
                  },
                  custom_elements: [
                    {
                      "content:encoded": post.html.replace(
                        /(?<=\"|\s)\/static\//g,
                        `${site.siteMetadata.url}\/static\/`
                      ),
                    },
                  ],
                });
              });
            },
            query: `
              {
                allQueenEmail(
                  sort: {fields: slug, order: DESC}
                ) {
                  nodes {
                    slug
                    date
                    childMarkdownRemark {
                      excerpt
                      html
                      ogImage {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                      frontmatter {
                        title
                        emojii
                      }
                    }
                  }
                }
              }
            `,
          },
          // Ola Vea Emails Feed
          {
            output: "/emails/olavea/rss.xml",
            title: "Emails from Queen Raae",
            match: "^/emails/olavea/",
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
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  title: `⛵🔧 ~ ${node.frontmatter.title}`,
                  description: node.excerpt,
                  date: node.fields.date,
                  url: site.siteMetadata.url + node.fields.slug,
                  guid: site.siteMetadata.url + node.fields.slug,
                  custom_elements: [
                    {
                      "content:encoded": node.html.replace(
                        /(?<=\"|\s)\/static\//g,
                        `${site.siteMetadata.url}\/static\/`
                      ),
                    },
                  ],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [fields___date] },
                  filter: {fields: {rss: {eq: "olavea-emails"}}}
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                      date
                    }
                    frontmatter {
                      title
                      emojii
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
