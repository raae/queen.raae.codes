---
title: How to test schema defaults for a Gatsby Plugins
emojii: ✅ 🧪
tags: testing, plugins, jest
---

The recommended way to test your `pluginSchemaOption` function is to use `testPluginOptionsSchema` from the `gatsby-plugin-utils` package.

For information on how to get started with plugin testing and how to use the `testPluginOptionsSchema`, read [Add tests to your Gatsby Plugin project ✅ 🧪](/emails/2022-02-11-plugins-tests/).

However, when writing tests for the [gatsby-plugin-cloudinary](https://github.com/cloudinary-devs/gatsby-source-cloudinary/blob/main/plugin/gatsby-node.test.js) plugin this week, I realized it does not help with testing the default configuration or any other modifiers.

Luckily testing the `pluginSchemaOption` without the help of `testPluginOptionsSchema` was possible:

```js
import Joi from "joi";
import { pluginOptionsSchema } from "./gatsby-node";

describe("pluginOptionsSchema", () => {
  test("should add defaults", async () => {
    const schema = pluginOptionsSchema({ Joi });
    const options = {
      cloudName: "cloudName",
      apiKey: "apiKey",
      apiSecret: "apiSecret",
      maxResults: 50,
    };
    const { value } = schema.validate(options);

    expect(value).toEqual({
      ...options,
      resourceType: "image",
      maxResults: 50,
      resultsPerPage: 50,
      tags: false,
    });
  });
});
```

It was extra important for this plugin as `resultsPerPage`is actually dependent on `maxResults` using [`Joi.ref('maxResults')`](https://joi.dev/api/?v=17.6.1#refkey-options).

Let me know if this was of use to you!

&nbsp;

All the best,  
Queen Raae

&nbsp;

**PS:** Tomorrow, we'll get a [sneak peek at the almost fully cooked Gatsby Slices API](https://youtu.be/F0Qs4NrSmBo) 🍕
