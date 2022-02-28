const { isString } = require("lodash");
const { createFilePath } = require("gatsby-source-filesystem");

const IS_DEV = process.env.NODE_ENV === "development";
const NOW = new Date().toISOString().substring(0, 10);
const FAR_FUTURE = "2300-01-01";
const CUT_OFF = IS_DEV ? FAR_FUTURE : NOW;

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    interface Email implements Node {
      id: ID!
      slug: String
      date: Date @dateformat
      childMarkdownRemark: MarkdownRemark @link
    }

    type QueenEmail implements Node & Email {
      slug: String
      date: Date @dateformat
      childMarkdownRemark: MarkdownRemark @link
      ogImage: File @link(from: "fields.ogImage")
    }

    type OlaVeaEmail implements Node & Email {
      slug: String
      date: Date @dateformat
      childMarkdownRemark: MarkdownRemark @link
    }
  `;

  createTypes(typeDefs);
};

exports.onCreateNode = async (gatsbyUtils, pluginOptions) => {
  const {
    node,
    actions: { createNode, createNodeField },
    createNodeId,
    getNode,
    reporter,
  } = gatsbyUtils;

  if (!isString(pluginOptions.basePath)) {
    reporter.panic("Email pages need a base path");
  }

  if (node.internal.type === "MarkdownRemark") {
    const markdownNode = node;
    const fileNode = getNode(node.parent);
    const type = fileNode?.sourceInstanceName || "";

    if (type.includes("Email")) {
      // Create email node
      const filePath = createFilePath({ node: fileNode, getNode });

      const pattern =
        /((\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01]))-(.*)/;
      const dateSearch = pattern.exec(fileNode.relativeDirectory);

      try {
        const emailId = createNodeId(`${markdownNode.id} >>> ${type}`);
        const dateString = `${dateSearch[2]}-${dateSearch[3]}-${dateSearch[4]}`;
        const slug = `${pluginOptions.basePath}/${dateString}-${dateSearch[5]}/`;

        // createNodeField({
        //   name: "date",
        //   node: markdownNode,
        //   value: dateString,
        // });

        if (dateString <= CUT_OFF) {
          createNode({
            id: emailId,
            slug: slug,
            date: dateString,
            parent: fileNode.id,
            childMarkdownRemark: markdownNode.id,
            internal: {
              contentDigest: markdownNode.internal.contentDigest,
              type: type,
            },
          });

          reporter.info(`${type} created for ${filePath} at ${slug} `);
        } else {
          reporter.warn(`${type} for ${filePath} is in the far future `);
        }
      } catch (error) {
        reporter.error(`${type} for ${filePath} failed: ${error.message}`);
      }
    }
  }
};
