exports.typeDefs = `
  interface Email implements Node {
    id: ID!
    slug: String
    title: String
    emojii: String
    html: String
    description: String
    date: Date @dateformat
  }

  type QueenEmail implements Node & Email {
    slug: String
    date: Date @dateformat
    title: String @childMarkdownRemarkResolver
    emojii: String @childMarkdownRemarkResolver
    html: String @childMarkdownRemarkResolver
    description: String @childMarkdownRemarkResolver(alternative: "excerpt")
    ogImage: String @proxy(from: "fields.ogImage")
  }

  type OlaVeaEmail implements Node & Email {
    slug: String
    date: Date @dateformat
    title: String @childMarkdownRemarkResolver
    emojii: String @childMarkdownRemarkResolver(default: "⛵ 🔧")
    html: String @childMarkdownRemarkResolver
    description: String @childMarkdownRemarkResolver(alternative: "excerpt")
  }
`;
