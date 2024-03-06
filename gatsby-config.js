const adapter = require("gatsby-adapter-netlify").default;
const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  adapter: adapter(),
  siteMetadata: {
    siteUrl: `https://queen.raae.codes`,
    siteName: `Queen Raae`,
    siteTagline: `Sailing the high seas of the World Wide Web`,
    siteDescription: `Ahoy, seasoned JavaScript developers and daring dev pirates! Join our swashbuckling crew as we embark on thrilling treasure hunts unraveling the secrets of HTML, CSS, and JavaScript, all while having a blast!`,
    siteLang: `en`,
    siteSocialImage: `/raae.jpg`,
    siteSocialImageAlt:
      "Queen Raae holding a laptop in front of her gallery wall",
    siteTwitterCreator: "@raae",
    siteSocialMedia: [
      "https://github.com/queen-raae",
      "https://twitter.com/raae",
      "https://www.youtube.com/QueenRaae",
    ],
  },
  plugins: [
    {
      resolve: "local-source-posts",
      options: {
        basePath: "/posts",
      },
    },
    {
      resolve: "local-source-talks",
      options: {
        basePath: "/talks",
      },
    },
    {
      resolve: "local-source-landing",
      options: {
        basePath: "",
      },
    },
    {
      resolve: "local-source-testimonials",
      options: {},
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
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
                exclude: ["Reddit", "Instagram", "Twitter", "Flickr"],
              },
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `@raae/gatsby-plugin-let-it-snow`,
    `local-extension-og-images`,
    `local-plugin-feed`,
    {
      resolve: `@raae/gatsby-plugin-fathom`,
      options: {
        site: `DIFBAEOT`,
        includedDomains: `queen.raae.codes`,
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /\-50\.svg$/,
        },
      },
    },
    {
      resolve: "local-plugin-redirects",
      options: {
        path: path.join(__dirname, "redirects.json"),
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
              pageContext
            }
          }
        }`,
        filterPages: (page, excludedRoute) => {
          console.log(
            page.path,
            excludedRoute,
            Boolean(excludedRoute === page.path)
          );
          const isTagArchive = Boolean(page.pageContext.tagLabel);
          const isExclude = excludedRoute === page.path;

          return isTagArchive || isExclude;
        },
        excludes: [
          "/posts/preferences/",
          "/posts/welcome/",
          "/posts/reminders/",
          "/search/[...term]/",
        ],
      },
    },
  ],
  trailingSlash: "always",
};
