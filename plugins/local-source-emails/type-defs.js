exports.typeDefs = `
  type EmailTag {
    label: String
    slug: String
  }

  interface Email implements Node {
    id: ID!
    slug: String
    author: String
    title: String
    tags: [EmailTag]
    emojii: String
    html: String
    description: String
    date: Date @dateformat
    ogImage: String

  }

  type QueenEmail implements Node & Email {
    slug: String
    title: String
    author: String
    tags: [EmailTag]
    date: Date @dateformat
    emojii: String @extractChildMarkdownRemarkField
    html: String @extractChildMarkdownRemarkField
    description: String @extractChildMarkdownRemarkField(alternative: "excerpt")
    ogImage: String @proxy(from: "fields.ogImage")
  }

  type OlaVeaEmail implements Node & Email {
    slug: String
    title: String
    author: String
    tags: [EmailTag]
    date: Date @dateformat
    emojii: String @extractChildMarkdownRemarkField(default: "⛵ 🔧")
    html: String @extractChildMarkdownRemarkField
    description: String @extractChildMarkdownRemarkField(alternative: "excerpt")
    ogImage: String @proxy(from: "fields.ogImage")
  }
`;
