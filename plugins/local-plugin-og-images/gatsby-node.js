const path = require(`path`);
const remark = require("remark");
const visit = require("unist-util-visit");
const fs = require("fs");
const { createHash } = require("crypto");

const { createImageBuffer } = require("./src/utils/open-graph-image");

exports.createResolvers = async (
  { createResolvers, reporter },
  pluginOptions
) => {
  const { publicPath } = pluginOptions || {};

  createResolvers({
    MarkdownRemark: {
      ogImageAlt: {
        type: "String",
        resolve() {
          return "test";
        },
      },
      ogImage: {
        type: "String",
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

              reporter.info("Open Graph Image generated for " + title);

              const hash = createHash("sha256");
              const digest = hash.update(imageBuffer).digest("hex");
              const filename = digest + ".png";
              const outputDirectory = path.join(publicPath, "ogImage");
              const fileOutput = path.join(publicPath, "ogImage", filename);

              console.log(fileOutput);

              if (!fs.existsSync(outputDirectory)) {
                fs.mkdirSync(outputDirectory);
              }

              fs.writeFileSync(fileOutput, imageBuffer);

              return "/ogImage/" + filename;
            }
          }
        },
      },
    },
  });
};
