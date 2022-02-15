const path = require(`path`);
const remark = require("remark");
const visit = require("unist-util-visit");
const { createFileNodeFromBuffer } = require(`gatsby-source-filesystem`);
const { createImageBuffer } = require("./src/utils/open-graph-image");
const { reporter } = require("gatsby-cli/lib/reporter/reporter");

const IS_PROD = process.env.NODE_ENV === "production";

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type QueenEmail implements Node {
      ogImage: File @link(from: "fields.ogImageId")
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
  if (node.internal.type === "MarkdownRemark") {
    const parentNode = getNode(node.parent);

    if (parentNode.internal.type === "QueenEmail") {
      const {
        frontmatter: { title, description, image },
        rawMarkdownBody,
      } = node;

      // Hack: excerpt
      let plaintext = "";
      const tree = remark().parse(rawMarkdownBody);
      visit(tree, "text", (node) => {
        plaintext += node.value;
      });

      try {
        const imageBuffer = await createImageBuffer({
          title,
          image: image && path.resolve(parentNode.dir, image),
          description: description || plaintext,
          height: 628,
          width: 1200,
        });

        const fileNode = await createFileNodeFromBuffer({
          buffer: imageBuffer,
          parentNodeId: parentNode.id,
          name: `ogImage`,
          getCache,
          createNode,
          createNodeId,
        });

        createNodeField({
          node: parentNode,
          name: "ogImageId",
          value: fileNode.id,
        });

        reporter.info(`Open Graph Image generated for: ${title}`);
      } catch (error) {
        reporter.warn(
          `Open Graph Image not generated for ${title}: ${error.message}`
        );
      }
    }
  }
};

exports.createPages = ({ actions: { createPage } }) => {
  // Only create demo page when not in production
  if (IS_PROD) return;

  const imagesTemplate = path.resolve(__dirname, `src/templates/og-images.js`);

  createPage({
    // Path for this page — required
    path: `open-graph-images`,
    component: imagesTemplate,
  });
};
