const path = require(`path`);
const remark = require("remark");
const visit = require("unist-util-visit");
const { createFileNodeFromBuffer } = require(`gatsby-source-filesystem`);
const { createImageBuffer } = require("./src/utils/open-graph-image");

exports.createResolvers = async ({
  actions,
  createNodeId,
  createResolvers,
  getCache,
  reporter,
}) => {
  const { createNode } = actions;
  createResolvers({
    MarkdownRemark: {
      ogImageAlt: {
        type: "String",
        resolve() {
          return "test";
        },
      },
      ogImage: {
        type: `File`,
        async resolve(source, args, context, info) {
          if (source.internal.type === "MarkdownRemark") {
            const parentNode = context.nodeModel.getNodeById({
              id: source.parent,
            });

            if (parentNode.internal.type === "QueenEmail") {
              const {
                frontmatter: { title, description, image },
                rawMarkdownBody,
              } = source;

              let plaintext = "";
              const tree = remark().parse(rawMarkdownBody);
              visit(tree, "text", (node) => {
                plaintext += node.value;
              });

              const imageBuffer = await createImageBuffer({
                title,
                image:
                  image && path.resolve(parentNode.absolutePath, "..", image),
                description: description || plaintext,
                height: 628,
                width: 1200,
              });

              if (imageBuffer) {
                reporter.info("Open Graph Image generated for " + title);
                const fileNode = await createFileNodeFromBuffer({
                  buffer: imageBuffer,
                  parentNodeId: source.id,
                  name: `ogImage`,
                  getCache,
                  createNode,
                  createNodeId,
                });
                return fileNode;
              }
            }
          }
        },
      },
    },
  });
};
