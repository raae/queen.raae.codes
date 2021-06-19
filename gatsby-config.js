module.exports = {
  siteMetadata: {
    title: "Gatsby Fun",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-theme-ui",
      options: {
        prismPreset: "night-owl",
        preset: "@theme-ui/preset-swiss",
      },
    },
    "gatsby-theme-style-guide",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `@raae/gatsby-plugin-fathom`,
      options: {
        site: "DIFBAEOT",
        includedDomains: "queen.raae.codes",
      },
    },
  ],
}
