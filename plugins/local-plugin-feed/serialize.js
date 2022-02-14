module.exports = (node, site, options) => {
  const {
    frontmatter: { title, description, emojii },
    html,
    excerpt,
    ogImage,
    parent: { date, slug },
  } = node;
  const titleEmojii = emojii || options.emojii;

  return {
    title: titleEmojii ? `${titleEmojii} ~ ${title}` : title,
    description: description || excerpt,
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
