---
title: Ola is adding async await to sourceNodes
---

## Adding async await to sourceNodes is a sub-task

In my daily dev practice I do one sub-task. Today's sub-task was adding `async` to `exports.sourceNodes =` and `await createCloudinaryNodes(`

I'll soon tell you why I do a daily sub-task, but first how can you find your own sub-task?

## How do you find your sub-task?

A. Look up again a dev-task you did last week

B. Break off a useless-on.it's-own sub-task

That's all 😺

## Why do I do a daily sub-task?

Because MY dev-brain practices more piraty on a tiny sub-task than on a BIG dev-task.

## Here is my code before practice

```js
// gatsby-node.js
// Add async

exports.sourceNodes = (gatsbyUtils, pluginOptions) => {
    // deleted code
    // Add await

  createCloudinaryNodes(
    gatsbyUtils,
    cloudinary,
    resourceOptions,
    cloudName
  );
};

```

## After practice
```js
// gatsby-node.js
exports.sourceNodes = async (gatsbyUtils, pluginOptions) => {
    // deleted code

  await createCloudinaryNodes(
    gatsbyUtils,
    cloudinary,
    resourceOptions,
    cloudName
  );
};

```

Try it out on your own dev-brain, it might make your practice more piraty 🏴‍☠️😺👍
ARR!

&nbsp;

Stay piraty 🏴‍☠️😺👍 and keep practicing!


Cap'n Ola Vea

P.S

Read more in Queen @raae's email [Remember to await node creation! ⏳ ⌛️](https://queen.raae.codes/emails/2022-05-25-await-node-creation/)