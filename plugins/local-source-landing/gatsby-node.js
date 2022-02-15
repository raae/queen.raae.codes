const { isString } = require("lodash");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = async (
  {
    node,
    actions: { createNode },
    createNodeId,
    getNode,
    loadNodeContent,
    reporter,
  },
  options
) => {
  if (
    node.internal.type === "File" &&
    node.sourceInstanceName.includes("Landing") &&
    node.internal.mediaType === "text/markdown" &&
    // Do not make landing pages of sections
    !node.relativePath.includes("_")
  ) {
    if (!isString(options.basePath)) {
      reporter.panic("Landing pages need a base path");
    }

    const slug = options.basePath + createFilePath({ node, getNode });
    const content = await loadNodeContent(node);
    const type = node.sourceInstanceName;

    createNode({
      id: createNodeId(`${node.id} >>> ${type}`),
      dir: node.dir,
      slug: slug,
      parent: node.id,
      internal: {
        content: content,
        mediaType: node.internal.mediaType,
        contentDigest: node.internal.contentDigest,
        type: type,
      },
    });
  }

  if (
    node.internal.type === "File" &&
    node.sourceInstanceName.includes("Landing") &&
    node.internal.mediaType === "text/markdown" &&
    // Do not make landing pages of sections
    node.relativePath.includes("_testimonials")
  ) {
    const slug = createFilePath({ node, getNode });
    const content = await loadNodeContent(node);
    const type = "Testimonial";

    createNode({
      ...node,
      id: createNodeId(`${node.id} >>> ${type}`),
      slug: slug,
      parent: node.id,
      internal: {
        content: content,
        mediaType: node.internal.mediaType,
        contentDigest: node.internal.contentDigest,
        type: type,
      },
    });
  }
};
