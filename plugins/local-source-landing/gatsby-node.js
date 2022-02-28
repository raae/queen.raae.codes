const { isString } = require("lodash");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type Landing implements Node {
      slug: String
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
    reporter.panic("Email pages need a base path");
  }

  if (node.internal.type === "MarkdownRemark") {
    const markdownNode = node;
    const fileNode = getNode(node.parent);
    const type = fileNode?.sourceInstanceName || "";
    const relativePath = fileNode?.relativePath || "";

    if (type.includes("Landing") && !relativePath.includes("_")) {
      const landingId = createNodeId(`${markdownNode.id} >>> ${type}`);
      const filePath = createFilePath({ node: fileNode, getNode });
      const slug = pluginOptions.basePath + filePath;

      createNode({
        id: landingId,
        slug: slug,
        parent: fileNode.id,
        childMarkdownRemark: markdownNode.id,
        internal: {
          contentDigest: markdownNode.internal.contentDigest,
          type: type,
        },
      });

      reporter.info(`${type} created for ${filePath} at ${slug} `);
    }
  }
};
