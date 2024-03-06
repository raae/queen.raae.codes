const findInSource = async ({ type, field, source, args, context, info }) => {
  const fields = info.schema.getType(type).getFields();
  const resolver = fields[field]?.resolve;
  if (resolver) {
    return await resolver(source, args, context, info);
  }
};

const findInMarkdownNode = async ({ markdownNode, ...params }) => {
  if (params.field === "excerpt") {
    params.args = {
      pruneLength: 155,
    };
  }

  let resolved = await findInSource({
    type: "MarkdownRemark",
    source: markdownNode,
    ...params,
  });

  if (!resolved) {
    // Try frontmatter
    resolved = await findInSource({
      type: "MarkdownRemarkFrontmatter",
      source: markdownNode.frontmatter,
      ...params,
    });
  }

  return resolved;
};

exports.extractChildMarkdownRemarkField = {
  name: "extractChildMarkdownRemarkField",
  args: {
    from: {
      type: "String",
    },
    alternative: {
      type: "String",
    },
    default: {
      type: "String",
    },
  },
  extend(options) {
    return {
      async resolve(source, args, context, info) {
        const markdownNode = context.nodeModel.getNodeById({
          id: source.childMarkdownRemark,
        });

        const params = { args, context, info };

        // Extract using "from" option
        // or name of field when no "from" option given
        let resolved = await findInMarkdownNode({
          markdownNode: markdownNode,
          field: options.from || info.fieldName,
          ...params,
        });

        if (!resolved) {
          // Extract using "alternative" option
          resolved = await findInMarkdownNode({
            markdownNode: markdownNode,
            field: options.alternative,
            ...params,
          });
        }

        return resolved || options.default;
      },
    };
  },
};
