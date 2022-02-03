const path = require("path");

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `ExternalTestimonial`,
        path: path.join(__dirname, "..", "..", "/content/testimonials"),
      },
    },
    `gatsby-transformer-yaml`,
  ],
};
