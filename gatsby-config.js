const path = require("path");

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
    `local-plugin-mui-emotion`,
    `local-plugin-mui-theme`,
    `gatsby-plugin-gatsby-cloud`,
  ],
};
