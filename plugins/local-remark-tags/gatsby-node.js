const { isString, uniq } = require("lodash");
const slugify = require("@sindresorhus/slugify");

const tagsToUniqueLowercaseArray = (tagsAsString) => {
  if (isString(tagsAsString)) {
    const tags = tagsAsString.split(",").map((tag) => tag.trim().toLowerCase());
    const uniqueTagsAndNonEmptyTags = uniq(tags).filter((tag) => !!tag);
    return uniqueTagsAndNonEmptyTags;
  } else {
    return [];
  }
};

exports.createSchemaCustomization = ({ actions, schema }, pluginOptions) => {
  const { createTypes } = actions;

  const typeDefs = [
    "type Tag { label: String!, slug: String! }",
    schema.buildObjectType({
      name: "MarkdownRemarkFrontmatter",
      fields: {
        tags: {
          type: "[Tag]",
          resolve(source, args, context, info) {
            if (!isString(pluginOptions.basePath)) {
              reporter.panic("Tag pages need a base path");
            }

            return tagsToUniqueLowercaseArray(source.tags).map((tag) => {
              return {
                label: tag,
                slug: `${pluginOptions.basePath}/${slugify(tag)}/`,
              };
            });
          },
        },
      },
    }),
  ];

  createTypes(typeDefs);
};
