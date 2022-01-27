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
    node.sourceInstanceName.includes("Email") &&
    node.internal.mediaType === "text/markdown"
  ) {
    const slug = createFilePath({ node, getNode });
    const content = await loadNodeContent(node);

    const pattern = /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;
    const dateSearch = pattern.exec(node.relativeDirectory);
    const date = dateSearch
      ? new Date(dateSearch[0]).toISOString()
      : new Date(0).toISOString();

    createNode({
      ...node,
      id: createNodeId(`${node.id} >>> QueenEmail`),
      slug: slug,
      date: date,
      internal: {
        content: content,
        mediaType: node.internal.mediaType,
        contentDigest: node.internal.contentDigest,
        type: node.sourceInstanceName,
      },
    });
  }
};
