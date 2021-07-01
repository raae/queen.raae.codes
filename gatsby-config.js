module.exports = {
  siteMetadata: {
    url: `https://queen.raae.codes`,
    title: `Gatsby Summer Function with Queen Raae and the Nattermob Pirates`,
    image: `queen-raae-og-image.jpg`,
    description: `Join the fun this summer and learn Gatsby Functions by adding at least three serverless features to your existing Gatsby site  🎉🎉🎉`,
    language: `en-gb`,
    keywords: [`gatsby`, `raae`, `OlaHolstVea`, `PaulieScanlon`, `Nattermob`],
  },
  plugins: [
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
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
}
