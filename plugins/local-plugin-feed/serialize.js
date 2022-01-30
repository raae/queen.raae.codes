const { getImage } = require("gatsby-plugin-image");

module.exports = (node, site) => {
  const {
    frontmatter: { title, description, emojii = "⛵🔧" },
    html,
    excerpt,
    ogImage,
    parent: { date, slug },
  } = node;
  const ogGatsbyImage = getImage(ogImage);

  return {
    title: `${emojii} ~ ${title}`,
    description: description || excerpt,
    date: date,
    url: site.siteMetadata.url + slug,
    guid: site.siteMetadata.url + slug,
    ...(ogImage && {
      enclosure: {
        url: site.siteMetadata.url + ogGatsbyImage?.images?.fallback?.src,
      },
    }),
    custom_elements: [
      {
        // Change relative static paths to absolute
        "content:encoded": html.replace(
          /(?<=\"|\s)\/static\//g,
          `${site.siteMetadata.url}\/static\/`
        ),
      },
    ],
  };
};
