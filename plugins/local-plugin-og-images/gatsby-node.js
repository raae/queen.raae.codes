const path = require(`path`);
const remark = require("remark");
const visit = require("unist-util-visit");
const { createFileNodeFromBuffer } = require(`gatsby-source-filesystem`);
const { createImageBuffer } = require("./src/utils/open-graph-image");

const IS_PROD = process.env.NODE_ENV === "production";

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type MarkdownRemark implements Node {
      ogImage: File @link(from: "fields.ogImage")
      ogImageAlt: String @link(from: "fields.ogImageAlt")
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

      let plaintext = "";
      const tree = remark().parse(rawMarkdownBody);
      visit(tree, "text", (node) => {
        plaintext += node.value;
      });

      const imageBuffer = await createImageBuffer({
        title,
        image: image && path.resolve(parentNode.absolutePath, "..", image),
        description: description || plaintext,
        height: 628,
        width: 1200,
      });

      if (imageBuffer) {
        const fileNode = await createFileNodeFromBuffer({
          buffer: imageBuffer,
          parentNodeId: node.id,
          name: `ogImage`,
          getCache,
          createNode,
          createNodeId,
        });

        createNodeField({
          name: "ogImage",
          node,
          value: fileNode.id,
        });
      }
    }
  }
};

exports.createPages = ({ actions: { createPage } }) => {
  // Only create demo page when not in production
  if (IS_PROD) return;

  const demoTemplate = path.resolve(__dirname, `src/templates/og-demo.js`);
  const imagesTemplate = path.resolve(__dirname, `src/templates/og-images.js`);

  createPage({
    // Path for this page — required
    path: `open-graph-image-demo`,
    component: demoTemplate,
  });

  createPage({
    // Path for this page — required
    path: `open-graph-images`,
    component: imagesTemplate,
  });
};
