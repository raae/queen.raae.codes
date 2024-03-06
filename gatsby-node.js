const path = require("path");

exports.createPages = async (gatsbyUtils) => {
  await createPostTagArchives(gatsbyUtils);
};

const createPostTagArchives = async (gatsbyUtils) => {
  const { actions, graphql, reporter } = gatsbyUtils;
  const { createPage } = actions;

  const tagTemplate = path.resolve("src/templates/posts-tag-archive.js");

  const result = await graphql(`
    {
      tags: allPost {
        group(field: { tags: { slug: SELECT } }) {
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
    // Find tag info (label and slug) on first post in group
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
