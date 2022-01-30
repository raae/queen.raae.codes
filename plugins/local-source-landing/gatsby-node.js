const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  createNodeId,
  getNode,
  loadNodeContent,
}) => {
  if (
    node.internal.type === "File" &&
    node.sourceInstanceName.includes("Landing") &&
    node.internal.mediaType === "text/markdown" &&
    // Do not make landing pages of sections
    !node.relativePath.includes("_")
  ) {
    const slug = createFilePath({ node, getNode });
    const content = await loadNodeContent(node);
    const type = node.sourceInstanceName;

    createNode({
      ...node,
      id: createNodeId(`${node.id} >>> ${type}`),
      slug: slug,
      internal: {
        content: content,
        mediaType: node.internal.mediaType,
        contentDigest: node.internal.contentDigest,
        type: type,
      },
    });
  }
};
