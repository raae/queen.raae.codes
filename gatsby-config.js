module.exports = {
  siteMetadata: {
    url: `https://queen.raae.codes`,
    title: `Queen Raae`,
    tagline: `Gatsby Plugins, Streams and Webinars`,
    description: `I teach web devs how to get the most out of Gatsby through workshops, rum-fueled treasure hunts in the sharky waters around the Gatsby islands and more!`,
    language: `en-gb`,
    keywords: [`gatsby`, `raae`, `jamstack`, `serverless`],
    twitter: `@raae`,
  },
  plugins: [
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `@raae/gatsby-plugin-fathom`,
      options: {
        site: `DIFBAEOT`,
        includedDomains: `queen.raae.codes`,
      },
    },
  ],
};
