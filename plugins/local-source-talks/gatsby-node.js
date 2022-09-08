const slugify = require("@sindresorhus/slugify");
const { isString } = require("lodash");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type Talk implements Node {
      slug: String
      date: Date @dateformat
      childMarkdownRemark: MarkdownRemark @link
    }
  `;

  createTypes(typeDefs);
};

exports.onCreateNode = async (gatsbyUtils, pluginOptions) => {
  const {
    node,
    actions: { createNode },
    createNodeId,
    getNode,
    reporter,
  } = gatsbyUtils;

  if (!isString(pluginOptions.basePath)) {
    reporter.panic("Talk pages need a base path");
  }

  if (node.internal.type === "MarkdownRemark") {
    const markdownNode = node;
    const fileNode = getNode(node.parent);
    const type = fileNode?.sourceInstanceName || "";
    const relativePath = fileNode?.relativePath || "";

    if (
      // Sourced as talk
      type.includes("Talk") &&
      // Is not partial
      !relativePath.includes("_") &&
      // Is not archive content
      relativePath !== ""
    ) {
      // Create talk node
      const filePath = createFilePath({ node: fileNode, getNode });

      // Pattern for talk directories YYYY-MM-DD-name
      const pattern = /((\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))-(.*)/;
      const dateSearch = pattern.exec(fileNode.relativeDirectory);

      try {
        const nodeId = createNodeId(`${markdownNode.id} >>> ${type}`);
        const dateString = dateSearch[1];
        const slug = slugify(dateSearch[0]);

        createNode({
          id: nodeId,
          slug: slug,
          date: dateString,
          parent: fileNode.id,
          childMarkdownRemark: markdownNode.id,
          internal: {
            contentDigest: markdownNode.internal.contentDigest,
            type: type,
          },
        });

        reporter.info(`${type} created for ${filePath} at ${slug} `);
      } catch (error) {
        reporter.error(`${type} for ${filePath} failed: ${error.message}`);
      }
    }
  }
};
