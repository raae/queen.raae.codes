const { getImage } = require("gatsby-plugin-image");

module.exports = (node, site) => {
  const { slug, date, ogImage, title, description, emojii, disclaimers } = node;
  let { html } = node;

  // Change relative static paths to absolute
  html = html.replace(
    /(?<=\"|\s)\/static\//g,
    `${site.siteMetadata.url}\/static\/`
  );

  // Change relative email paths to absolute
  html = html.replace(
    /(?<=\"|\s)\/emails\//g,
    `${site.siteMetadata.url}\/emails\/`
  );

  if (disclaimers.length > 0) {
    html += `<br/>
              <ul>`;

    for (disclaimer of disclaimers) {
      html += `<li>${disclaimer}</li>`;
    }

    html += `</ul>`;
  }

  return {
    title: emojii ? `${emojii} ~ ${title}` : title,
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
        "content:encoded": html,
      },
    ],
  };
};
