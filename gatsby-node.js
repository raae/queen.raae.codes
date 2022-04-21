const path = require("path");
const _ = require("lodash");
const stringSimilarity = require("string-similarity");

exports.createPages = async (gatsbyUtils) => {
  await createEmailTagArchives(gatsbyUtils);
};

const createEmailTagArchives = async (gatsbyUtils) => {
  const { actions, graphql, reporter } = gatsbyUtils;
  const { createPage } = actions;

  const tagTemplate = path.resolve("src/templates/email-tag-archive.js");

  const result = await graphql(`
    {
      tags: allEmail {
        group(field: tags___slug) {
          slug: fieldValue
          nodes {
            tags {
              label
              slug
            }
          }
        }
      }
    }
  `);

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Extract tag data from query
  const tags = result.data.tags.group;

  // Make tag pages
  tags.forEach(({ slug, nodes }) => {
    // Find tag info (label and slug) on first email in group
    const tag = nodes[0].tags.find((tag) => tag.slug === slug);
    createPage({
      path: tag.slug,
      component: tagTemplate,
      context: {
        tagLabel: tag.label,
      },
    });
  });
};
