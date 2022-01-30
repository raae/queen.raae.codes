const path = require("path");

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `QueenEmail`,
        path: path.join(__dirname, "..", "..", "/content/emails-queen"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `OlaVeaEmail`,
        path: path.join(__dirname, "..", "..", "/content/emails-olavea"),
      },
    },
  ],
};
