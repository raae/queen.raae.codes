const path = require("path");

const POST_DIR = process.env.POST_DIR || "content";

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `QueenPost`,
        path: path.join(__dirname, "..", "..", `/${POST_DIR}/posts-queen`),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `OlaVeaPost`,
        path: path.join(__dirname, "..", "..", `/${POST_DIR}/posts-olavea`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, "..", "..", `/${POST_DIR}/tags`),
      },
    },
  ],
};
