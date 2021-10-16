const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNodeField, createNode } = actions;

  const parent = getNode(node.parent);

  if (node.internal.type === "MarkdownRemark") {
    console.log("MarkdownRemark");
    const slug = createFilePath({ node, getNode });

    createNodeField({
      name: "slug",
      node,
      value: `${slug}`,
    });
  }
};
