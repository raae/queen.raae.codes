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
    const date = dateSearch
      ? new Date(dateSearch[0]).toISOString()
      : new Date(0).toISOString();

    // Add date
    createNodeField({
      name: "date",
      node,
      value: date,
    });

    if (slug.includes("/queen-emails/") && date <= NOW) {
      // Queen emails
      createNodeField({
        name: "rss",
        node,
        value: "queen-emails",
      });

      createNodeField({
        name: "slug",
        node,
        value: slug.replace("/queen-emails/", "/emails/"),
      });
    } else if (slug.includes("/olavea-emails/") && date <= NOW) {
      // Ola emails
      createNodeField({
        name: "rss",
        node,
        value: "olavea-emails",
      });

      createNodeField({
        name: "slug",
        node,
        value: slug.replace("/olavea-emails/", "/emails/olavea/"),
      });
    } else {
      // Other markdown pages
      createNodeField({
        name: "slug",
        node,
        value: slug,
      });
    }
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
    let template = path.resolve(`./src/templates/default.js`);

    if (node.fields.slug.includes("/_")) {
      // Skip markdown files containing "/_"
      return;
    }

    if (node.fields.slug.includes("/emails/olavea/")) {
      // Ola Email
      template = path.resolve(`./src/templates/olavea-email.js`);
    } else if (node.fields.slug.includes("/emails")) {
      // Queen Email
      template = path.resolve(`./src/templates/queen-email.js`);
    }

    createPage({
      path: node.fields.slug,
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
