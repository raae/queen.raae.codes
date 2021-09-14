module.exports = {
  siteMetadata: {
    url: `https://queen.raae.codes`,
    title: `Queen Raae - Gatsby Plugins, Streams and Webinars`,
    description: ``,
    language: `en-gb`,
    keywords: [`gatsby`, `raae`, `jamstack`, `serverless`],
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
