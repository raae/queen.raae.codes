---
title: Add tests to your Gatsby Plugin project
emojii: ✅ 🧪
---

We added tests to the Gatsby Plugin Starter in yesterday's unauthorized and rum-fueled [treasure hunt](https://youtu.be/sj3YuX_TpVk) in the sharky waters around the Gatsby islands.

And you should too!

A great starting point is to test your `pluginOptionsSchema` implementation!

## Set up your test environment

First, set up [Jest](https://jestjs.io/) and the needed extras to get it running with Gatsby.

If you use yarn workspace, as I do for the Gatsby Plugin Starter, I recommend adding test-related packages and setup to your root workspace.

`yarn add -D -W jest babel-jest react-test-renderer babel-preset-gatsby identity-obj-proxy`

`-D` makes it a dev dependency, and `-W` lets yarn know that "yes, I am sure I want this in the workspace root."

Then follow the Gatby [test documentation](https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/) to create `jest.config.js`, `jest-preprocess.js` and `loadershim.js`.

To test continuously while developing, add a test command to your root package:

```json
// package.json

"scripts": {
  "test": "jest --watch",
}
```

To run the test before you allow a semantic release amend the semantic-release command:

```json
// package.json

"scripts": {
  "semantic-release": "jest && semantic-release"
}
```

## Write your plugin schema tests

To make it easier to test your schema implementation, Gatsby provides us with `testPluginOptionsSchema`. Install `gatsby-plugin-utils` the same way you installed `jest` + friends.

`yarn add -W -D gatsby-plugin-utils`

Now you are ready to write your tests!

Below is an example from the [@raae/gatsby-plugin-starter](https://github.com/queen-raae/gatsby-plugin-starter/pull/29) work we did in yesterday's unauthorized and rum-fueled [treasure hunt](https://youtu.be/sj3YuX_TpVk) in the sharky waters around the Gatsby islands.

```js
// gatby-node.test.js

import { testPluginOptionsSchema } from "gatsby-plugin-utils";
import { pluginOptionsSchema } from "./gatsby-node";

describe("pluginOptionsSchema", () => {
  describe("message", () => {
    test("string is valid message", async () => {
      const options = {
        message: "This is a valid message!",
      };
      const { isValid } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        options
      );

      expect(isValid).toBe(true);
    });

    test("number is invalid message", async () => {
      const options = {
        message: 123,
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        options
      );

      expect(isValid).toBe(false);
      expect(errors).toEqual([`"message" must be a string`]);
    });
  });
});
```

&nbsp;  
All the best,  
Queen Raae
