const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode });

    createNodeField({
      name: "slug",
      node,
      value: `${slug}`,
    });
  }
};

exports.onCreatePage = ({ page, actions, getNode }) => {
  const { deletePage } = actions;
  const node = getNode(page.context?.id);

  // Delete the page if its of type Markdown
  // and the parent node is of type block
  if (node?.internal.type === "MarkdownRemark" && node) {
    const parent = getNode(node.parent);
    if (parent.sourceInstanceName === "block") {
      deletePage(page);
    }
  }
};

// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const { createTypes } = actions;
//   const typeDefs = [
//     "type MarkdownRemark implements Node { frontmatter: Frontmatter }",
//     schema.buildObjectType({
//       name: "Frontmatter",
//       fields: {
//         testimonials: {
//           name: "Testimonials",
//           fields: {
//             items: {
//               type: ["MarkdownRemark"],
//               resolve: async (source, args, context, info) => {
//                 console.log(source);
//                 const { entries } = await context.nodeModel.findAll({
//                   query: {
//                     filter: {
//                       fields: {
//                         slug: { eq: "/testimonials/ineza-summer/" },
//                       },
//                     },
//                   },
//                   type: "MarkdownRemark",
//                 });
//                 return entries;
//               },
//             },
//           },
//         },
//       },
//     }),
//   ];
//   createTypes(typeDefs);
// };
