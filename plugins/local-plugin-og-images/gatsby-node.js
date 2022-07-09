const path = require(`path`);
const fs = require(`fs`);
const remark = require("remark");
const visit = require("unist-util-visit");
const { createImageBuffer } = require("./src/utils/open-graph-image");
const { reporter } = require("gatsby-cli/lib/reporter/reporter");

const SECONDARY_COLOR = {
  QueenEmail: "#ffde59",
  OlaVeaEmail: "#5DADE2",
};

const AVATAR = {
  QueenEmail: "queen-avatar.jpg",
  OlaVeaEmail: "olavea-avatar.jpg",
};

const SIGNATURE = {
  QueenEmail: "queen.raae.codes",
  OlaVeaEmail: "Cap'n Ola (queen.raae.codes)",
};

exports.onCreateNode = async ({
  node,
  actions: { createNodeField },
  getNode,
}) => {
  if (node.internal.type.includes("Email")) {
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
        avatar: AVATAR[node.internal.type],
        image: image && path.resolve(markdownParentNode.dir, image),
        description: description || plaintext,
        signature: SIGNATURE[node.internal.type],
        height: 628,
        width: 1200,
        secondaryColor: SECONDARY_COLOR[node.internal.type],
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
