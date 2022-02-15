const { isString } = require("lodash");
const { createFilePath } = require("gatsby-source-filesystem");

const NOW = new Date().toISOString();
const FAR_FUTURE = new Date("2300-01-01").toISOString();
const CUT_OFF = process.env.NODE_ENV === "development" ? FAR_FUTURE : NOW;

exports.onCreateNode = async (
  {
    node,
    actions: { createNode, createNodeField },
    createNodeId,
    getNode,
    loadNodeContent,
    reporter,
  },
  options
) => {
  if (
    node.internal.type === "File" &&
    node.sourceInstanceName.includes("Email") &&
    node.internal.mediaType === "text/markdown"
  ) {
    if (!isString(options.basePath)) {
      reporter.panic("Email pages need a base path");
    }

    const slug = options.basePath + createFilePath({ node, getNode });
    const content = await loadNodeContent(node);
    const type = node.sourceInstanceName;

    const pattern = /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;
    const dateSearch = pattern.exec(node.relativeDirectory);
    const date = dateSearch
      ? new Date(dateSearch[0]).toISOString()
      : new Date(0).toISOString();

    if (date <= CUT_OFF) {
      createNode({
        id: createNodeId(`${node.id} >>> ${type}`),
        dir: node.dir,
        slug: slug,
        date: date,
        internal: {
          content: content,
          mediaType: node.internal.mediaType,
          contentDigest: node.internal.contentDigest,
          type: type,
        },
      });
    }
  }

  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    createNodeField({
      name: "date",
      node,
      value: fileNode.date,
    });
  }
};
