const slugify = require("@sindresorhus/slugify");
const stringSimilarity = require("string-similarity");
const { isString, uniq, intersectionBy } = require("lodash");
const { createFilePath } = require("gatsby-source-filesystem");
const { typeDefs } = require("./type-defs");
const { extractChildMarkdownRemarkField } = require("./field-extention");

const emailFields = {
  disclaimers: {
    type: "[String]",
    resolve: async (source, args, context, info) => {
      const promises = source.tags.map(async ({ label }) => {
        const brandYamlNode = await context.nodeModel.findOne({
          type: "BrandsYaml",
          query: {
            filter: { label: { eq: label } },
          },
        });
        return brandYamlNode?.disclaimer;
      });

      const disclaimers = await Promise.all(promises);
      return disclaimers.filter((disclaimer) => Boolean(disclaimer));
    },
  },
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions;

  createFieldExtension(extractChildMarkdownRemarkField);
  createTypes([
    typeDefs,
    schema.buildObjectType({
      name: "QueenEmail",
      fields: emailFields,
    }),
    schema.buildObjectType({
      name: "OlaVeaEmail",
      fields: emailFields,
    }),
  ]);
};

exports.createResolvers = ({ createResolvers }) =>
  createResolvers({
    QueenEmail: {
      relatedEmails: {
        type: "[QueenEmail!]",
        args: { limit: "Int", titleTreshold: "Float" },
        async resolve(source, args, context, info) {
          const limit = args.limit || 3;
          const titleTreshold = args.titleTreshold || 0.7;

          const { entries } = await context.nodeModel.findAll({
            type: `QueenEmail`,
            query: {
              filter: {
                slug: {
                  ne: source.slug,
                }, // not current email
                isRelatable: {
                  eq: true,
                },
              },
            },
          });

          const similarityEntries = entries
            .map((email) => {
              const intersectingTags = intersectionBy(
                source.tags,
                email.tags,
                "slug"
              );

              const titleScore = stringSimilarity.compareTwoStrings(
                source.title.replace("Gatsby", ""),
                email.title
              );

              // titleSimilarity = 0 if treshold is not met
              const titleSimilarity =
                titleScore > titleTreshold ? titleScore : 0;

              return {
                ...email,
                similarity: intersectingTags.length + 3.0 * titleSimilarity,
              };
            })
            .filter(({ similarity }) => similarity !== 0);

          return Array.from(similarityEntries)
            .sort((a, b) => {
              return b.similarity - a.similarity;
            })
            .slice(0, limit);
        },
      },
    },
  });

const tagsToUniqueLowercaseArray = (tagsAsString) => {
  if (isString(tagsAsString)) {
    const tags = tagsAsString.split(",").map((tag) => tag.trim().toLowerCase());
    const uniqueTagsAndNonEmptyTags = uniq(tags).filter((tag) => !!tag);
    return uniqueTagsAndNonEmptyTags;
  } else {
    return [];
  }
};

exports.onCreateNode = async (gatsbyUtils, pluginOptions) => {
  const {
    node,
    actions: { createNode },
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
      const author = type.replace("Email", "");

      const pattern =
        /((\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01]))-(.*)/;
      const dateSearch = pattern.exec(fileNode.relativeDirectory);

      try {
        const emailId = createNodeId(`${markdownNode.id} >>> ${type}`);
        const dateString = `${dateSearch[2]}-${dateSearch[3]}-${dateSearch[4]}`;
        const slug = `${pluginOptions.basePath}/${dateString}-${dateSearch[5]}/`;
        const title = markdownNode.frontmatter.title;
        const isRelatable = !title.includes("week around the Gatsby islands");
        const tags = tagsToUniqueLowercaseArray(`
           ${markdownNode.frontmatter.tags || ""},
           ${markdownNode.frontmatter.brands || ""},
           ${markdownNode.frontmatter.peeps || ""},
           ${markdownNode.frontmatter.projects || ""},
          `).map((tag) => {
          return {
            label: tag,
            slug: `${pluginOptions.basePath}/${slugify(tag)}/`,
          };
        });

        createNode({
          id: emailId,
          slug: slug,
          title: title,
          date: dateString,
          parent: fileNode.id,
          author: author,
          tags: tags,
          isRelatable: isRelatable,
          childMarkdownRemark: markdownNode.id,
          internal: {
            contentDigest: markdownNode.internal.contentDigest,
            type: type,
          },
        });

        reporter.info(`${type} created for ${filePath} at ${slug} `);
      } catch (error) {
        reporter.error(`${type} for ${filePath} failed: ${error.message}`);
      }
    }
  }
};
