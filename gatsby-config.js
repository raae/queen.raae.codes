module.exports = {
  siteMetadata: {
    url: `https://queen.raae.codes`,
    title: `Queen Raae`,
    tagline: `Gatsby Bootcamps, Plugins, Streams and Webinars`,
    description: `I teach web devs how to get the most out of Gatsby through workshops, rum-fueled treasure hunts in the sharky waters around the Gatsby islands and more!`,
    lang: `en`,
    social: {
      image: `/raae.png`,
      alt: "Queen Raae holding a laptop in front of her gallery wall",
      twitter: {
        site: "@raae",
        card: "summary_large_image",
      },
    },
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              providers: {
                // Important to exclude providers
                // that adds js to the page.
                // If you do not need them.
                exclude: [
                  "Reddit",
                  "Instagram",
                  "Twitter",
                  "Flickr",
                  "YouTube",
                ],
              },
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
          },
        ],
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `@raae/gatsby-plugin-let-it-snow`,
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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  title: `${node.frontmatter.emojii} ~ ${node.frontmatter.title}`,
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
                  filter: {fields: {rss: {eq: "queen-emails"}}}
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
    {
      resolve: `@raae/gatsby-plugin-fathom`,
      options: {
        site: `DIFBAEOT`,
        includedDomains: `queen.raae.codes`,
      },
    },
  ],
};
