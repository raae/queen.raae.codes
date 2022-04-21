const path = require("path");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: `https://queen.raae.codes`,
    siteName: `Queen Raae`,
    siteTagline: `Gatsby Bootcamps, Plugins, Streams and Webinars`,
    siteDescription: `I teach web devs how to get the most out of Gatsby through workshops, rum-fueled treasure hunts in the sharky waters around the Gatsby islands and more!`,
    siteLang: `en`,
    siteSocialImage: `/raae.jpg`,
    siteSocialImageAlt:
      "Queen Raae holding a laptop in front of her gallery wall",
    siteTwitterCreator: "@raae",
  },
  plugins: [
    {
      resolve: "local-source-emails",
      options: {
        basePath: "/emails",
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
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "local-remark-tags",
            options: {
              basePath: "/tags",
            },
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
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `@raae/gatsby-plugin-let-it-snow`,
    `local-plugin-og-images`,
    `local-plugin-feed`,
    {
      resolve: "local-plugin-redirects",
      options: {
        path: path.join(__dirname, "redirects.json"),
      },
    },
    {
      resolve: `@raae/gatsby-plugin-fathom`,
      options: {
        site: `DIFBAEOT`,
        includedDomains: `queen.raae.codes`,
      },
    },
    `@raae/gatsby-theme-mui`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-sitemap`,
  ],
  trailingSlash: "always",
};
