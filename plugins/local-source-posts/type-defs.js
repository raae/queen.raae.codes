exports.typeDefs = `
  type PostTag {
    label: String
    slug: String
  }

  interface Post implements Node {
    id: ID!
    slug: String
    author: String
    title: String
    tags: [PostTag]
    emojii: String
    html: String
    description: String
    date: Date @dateformat
    ogImage: String!
    disclaimers: [String]
  }

  type QueenPost implements Node & Post {
    slug: String
    title: String
    author: String
    tags: [PostTag]
    date: Date @dateformat
    emojii: String @extractChildMarkdownRemarkField(default: "📝 ✨")
    html: String @extractChildMarkdownRemarkField
    description: String @extractChildMarkdownRemarkField(alternative: "excerpt")
    ogImage: String! @ogImage
    disclaimers: [String]
  }

  type OlaVeaPost implements Node & Post {
    slug: String
    title: String
    author: String
    tags: [PostTag]
    date: Date @dateformat
    emojii: String @extractChildMarkdownRemarkField(default: "⛵ 🔧")
    html: String @extractChildMarkdownRemarkField
    description: String @extractChildMarkdownRemarkField(alternative: "excerpt")
    ogImage: String! @ogImage
    disclaimers: [String]
  }
`;
