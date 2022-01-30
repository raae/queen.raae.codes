const path = require("path");

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `Landing`,
        path: path.join(__dirname, "..", "..", "/content/landing"),
      },
    },
  ],
};
