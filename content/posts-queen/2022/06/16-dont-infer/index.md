---
title: Do not disable inference of node type schemas in your Gatsby plugins
emojii: ⛔️ 🧱
tags: dontInfer, createNodeField, source plugins, schema
---

It can be tempting to want complete control over the node types created by your plugin. But by adding `@dontInfer` (or similar), you remove your users' ability to add fields using `createNodeField`. A common approach to extending the functionality of your plugin.

Explicitly typing out what you expect to be available on your node types is super helpful, but limiting your users like that can be super stressful and hard to debug for them.

- Is this new? Did custom fields use to show up even with `@dontInfer`?
- Am I missing something here that would change my mind?

&nbsp;  
All the best,  
Queen Raae
