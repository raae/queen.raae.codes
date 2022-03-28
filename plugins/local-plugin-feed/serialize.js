const { getImage } = require("gatsby-plugin-image");

module.exports = (node, site) => {
  const { slug, date, ogImage, title, description, emojii, html } = node;

  const titleEmojii = emojii;

  return {
    title: titleEmojii ? `${titleEmojii} ~ ${title}` : title,
    description: description,
    date: date,
    url: site.siteMetadata.url + slug,
    guid: site.siteMetadata.url + slug,
    ...(ogImage && {
      enclosure: {
        url: site.siteMetadata.url + ogImage,
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
