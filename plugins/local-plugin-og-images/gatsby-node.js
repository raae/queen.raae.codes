const path = require(`path`);
const remark = require("remark");
const visit = require("unist-util-visit");
const { createFileNodeFromBuffer } = require(`gatsby-source-filesystem`);
const { createImageBuffer } = require("./src/utils/open-graph-image");
const { reporter } = require("gatsby-cli/lib/reporter/reporter");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type QueenEmail implements Node {
      ogImage: File @link(from: "fields.ogImage")
    }
  `);
};

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getNode,
  getCache,
}) => {
  if (node.internal.type === "QueenEmail") {
    const emailNode = node;
    const markdownNode = getNode(emailNode.childMarkdownRemark);
    const markdownParentNode = getNode(markdownNode.parent);

    const {
      frontmatter: { title, description, image },
      rawMarkdownBody,
    } = markdownNode;

    // Hack: excerpt
    let plaintext = "";
    const tree = remark().parse(rawMarkdownBody);
    visit(tree, "text", (node) => {
      plaintext += node.value;
    });

    try {
      const imageBuffer = await createImageBuffer({
        title,
        image: image && path.resolve(markdownParentNode.dir, image),
        description: description || plaintext,
        height: 628,
        width: 1200,
      });

      const imageFileNode = await createFileNodeFromBuffer({
        buffer: imageBuffer,
        parentNodeId: emailNode.id,
        name: `ogImage`,
        getCache,
        createNode,
        createNodeId,
      });

      createNodeField({
        node: emailNode,
        name: "ogImage",
        value: imageFileNode.id,
      });

      reporter.info(`Open Graph Image generated for: ${title}`);
    } catch (error) {
      reporter.warn(
        `Open Graph Image not generated for ${title}: ${error.message}`
      );
    }
  }
};
