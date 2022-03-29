const path = require(`path`);
const fs = require(`fs`);
const remark = require("remark");
const visit = require("unist-util-visit");
const { createImageBuffer } = require("./src/utils/open-graph-image");
const { reporter } = require("gatsby-cli/lib/reporter/reporter");

exports.onCreateNode = async ({
  node,
  actions: { createNodeField },
  getNode,
}) => {
  if (node.internal.type === "QueenEmail") {
    const emailNode = node;
    const markdownNode = getNode(emailNode.childMarkdownRemark);
    const markdownParentNode = getNode(markdownNode.parent);

    const {
      id,
      frontmatter: { title, description, image },
      rawMarkdownBody,
      internal: { contentDigest },
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
      const imagePath = `/og-image-${id}-${contentDigest}.jpg`;
      const outputPath = path.join("./public", imagePath);
      fs.writeFileSync(outputPath, imageBuffer);

      createNodeField({
        node: emailNode,
        name: "ogImage",
        value: imagePath,
      });

      reporter.info(`Open Graph Image generated for: ${title}`);
    } catch (error) {
      reporter.warn(
        `Open Graph Image not generated for ${title}: ${error.message}`
      );
    }
  }
};
