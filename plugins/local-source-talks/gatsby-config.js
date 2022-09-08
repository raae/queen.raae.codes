const path = require("path");

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `Talk`,
        path: path.join(__dirname, "..", "..", "/content/talks"),
      },
    },
  ],
};
