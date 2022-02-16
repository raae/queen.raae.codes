const { isString } = require("lodash");
const { createFilePath } = require("gatsby-source-filesystem");

const NOW = new Date().toISOString().substring(0, 10);
const FAR_FUTURE = "2300-01-01";
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

    const filePath = createFilePath({ node, getNode });
    const content = await loadNodeContent(node);
    const type = node.sourceInstanceName;

    const pattern = /((\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01]))-(.*)/;
    const dateSearch = pattern.exec(node.relativeDirectory);

    try {
      const dateString = `${dateSearch[2]}-${dateSearch[3]}-${dateSearch[4]}`;
      const slug = `${options.basePath}/${dateString}-${dateSearch[5]}/`;

      if (dateString <= CUT_OFF) {
        createNode({
          id: createNodeId(`${node.id} >>> ${type}`),
          dir: node.dir,
          slug: slug,
          date: dateString,
          internal: {
            content: content,
            mediaType: node.internal.mediaType,
            contentDigest: node.internal.contentDigest,
            type: type,
          },
        });

        reporter.info(`Created email node for ${filePath} at ${slug}`);
      }
    } catch (error) {
      reporter.warn(`Error creating node for ${filePath}: ${error.message}`);
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
