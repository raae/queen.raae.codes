exports.typeDefs = `
  interface Email implements Node {
    id: ID!
    slug: String
    author: String
    title: String
    emojii: String
    html: String
    description: String
    date: Date @dateformat
    ogImage: String
    tags: [Tag]
  }

  type QueenEmail implements Node & Email {
    slug: String
    author: String
    date: Date @dateformat
    title: String @extractChildMarkdownRemarkField
    emojii: String @extractChildMarkdownRemarkField
    html: String @extractChildMarkdownRemarkField
    description: String @extractChildMarkdownRemarkField(alternative: "excerpt")
    ogImage: String @proxy(from: "fields.ogImage")
    tags: [Tag] @extractChildMarkdownRemarkField
  }

  type OlaVeaEmail implements Node & Email {
    slug: String
    author: String
    date: Date @dateformat
    title: String @extractChildMarkdownRemarkField
    emojii: String @extractChildMarkdownRemarkField(default: "⛵ 🔧")
    html: String @extractChildMarkdownRemarkField
    description: String @extractChildMarkdownRemarkField(alternative: "excerpt")
    ogImage: String
    tags: [Tag] @extractChildMarkdownRemarkField
  }
`;
