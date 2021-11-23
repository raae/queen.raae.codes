const path = require(`path`);
const { createFilePath } = require("gatsby-source-filesystem");

const NOW = new Date().toISOString();
const FAR_FUTURE = new Date("2300-01-01").toISOString();

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode });
    const pattern = /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;
    const dateSearch = pattern.exec(slug);

    createNodeField({
      name: "slug",
      node,
      value: `${slug}`,
    });

    createNodeField({
      name: "date",
      node,
      value: dateSearch ? new Date(dateSearch[0]) : new Date(0),
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql(
    `
      query loadPagesQuery($lteDate: Date!) {
        allMarkdownRemark(filter: { fields: { date: { lte: $lteDate } } }) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `,
    { lteDate: process.env.NODE_ENV === "development" ? FAR_FUTURE : NOW }
  );

  data.allMarkdownRemark.nodes.forEach((node) => {
    let slug = node.fields.slug;
    let template = path.resolve(`./src/templates/default.js`);

    if (slug.includes("/_")) {
      // Skip markdown files containing "/_"
      return;
    }

    if (node.fields.slug.includes("queen-emails")) {
      slug = node.fields.slug.replace("queen-emails", "emails");
      template = path.resolve(`./src/templates/queen-email.js`);
    }

    createPage({
      path: slug,
      component: template,
      ownerNodeId: node.id,
      context: {
        id: node.id,
      },
    });
  });
};

// exports.onCreatePage = ({ page, actions, getNode }) => {
//   const { deletePage } = actions;
//   const node = getNode(page.context?.id);

//   // Delete the page if its of type Markdown
//   // and there is "/_" in its slug
//   if (node?.internal.type === "MarkdownRemark") {
//     if (node.fields.slug.includes("/_")) {
//       deletePage(page);
//     }
//   }
// };

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
