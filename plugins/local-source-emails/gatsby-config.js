const path = require("path");

const EMAIL_DIR = process.env.EMAIL_DIR || "content";

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `QueenEmail`,
        path: path.join(__dirname, "..", "..", `/${EMAIL_DIR}/emails-queen`),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `OlaVeaEmail`,
        path: path.join(__dirname, "..", "..", `/${EMAIL_DIR}/emails-olavea`),
      },
    },
  ],
};
