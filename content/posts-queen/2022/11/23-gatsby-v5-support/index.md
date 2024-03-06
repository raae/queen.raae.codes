---
title: How to add v5 support to your Gatsby plugin
tags: gatsby plugin, gatsby-plugin-let-it-snow, gatsby v5
---

For many plugins all you need to do is add "^5.0.0" to you `peerDependencies` string and "18.x" to your `node.engines` string in the plugin's package.json.

But some plugins will need changes to handle Gatsby v5's breaking changes. They are [all listed](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/#handling-breaking-changes) in the migration v4 to v5 migration docs. The ones most probable to break your plugin are probably:

- [GraphQL schema: Changes to sort and aggregation fields](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/#graphql-schema-changes-to-sort-and-aggregation-fields)
- [Removal of nodeModel.runQuery and nodeModel.getAllNodes](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/#removal-of-nodemodelrunquery-and-nodemodelgetallnodes)

Luckily [@raae/gatsby-plugin-let-it-snow](https://github.com/queen-raae/gatsby-plugin-let-it-snow) required no changes, but I made su❄️re to upgrade the demo to v5 and add v5 as a possible peer dependency.

So no reason not to add some snow to your Gatsby v5 experiments this season!

All the best,  
Queen Raae
