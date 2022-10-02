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

const createOgImage = async (source, args, context, info) => {
  const markdownNode = context.nodeModel.getNodeById({
    id: source.childMarkdownRemark,
    type: "MarkdownRemark",
  });

  const markdownParentFileNode = context.nodeModel.getNodeById({
    id: markdownNode.parent,
    type: "File",
  });

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
      avatar: AVATAR[source.internal.type],
      image: image && path.resolve(markdownParentFileNode.dir, image),
      description: description || plaintext,
      signature: SIGNATURE[source.internal.type],
      height: 628,
      width: 1200,
      secondaryColor: SECONDARY_COLOR[source.internal.type],
    });
    const imagePath = `/og-image-${id}-${contentDigest}.jpg`;
    const outputPath = path.join("./public", imagePath);
    fs.writeFileSync(outputPath, imageBuffer);

    reporter.info(`Open Graph Image generated for: ${title}`);

    return imagePath;
  } catch (error) {
    reporter.warn(
      `Open Graph Image not generated for ${title}: ${error.message}`
    );

    return "";
  }
};

// exports.createResolvers = ({ createResolvers }) => {
//   const resolvers = {
//     QueenEmail: {
//       ogImage: {
//         type: "String!",
//         resolve: createOgImage,
//       },
//     },
//     OlaVeaEmail: {
//       ogImage: {
//         type: "String!",
//         resolve: createOgImage,
//       },
//     },
//   };

//   createResolvers(resolvers);
// };

exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension } = actions;

  createFieldExtension({
    name: "ogImage",
    extend() {
      return {
        resolve: createOgImage,
      };
    },
  });
};
