---
title: Ola gets the list of twitter users from Xata 🦋
tags: sourceNodes, gatsby-plugin practice
---

## Sub-task: Get the list of users from Xata 🦋

In my daily gatsby-plugin practice, I ONLY do one tiny sub-task each session. Today's sub-task was:

Get the list of users from Xata 🦋

&nbsp;

## HOW did I get the list of users from Xata 🦋?

* I login to Queen Raae Workspace on Xata with a magic link
* I click "</> get code snippet"
* I click "Query all records"
* I copy the code example
* I rewrite to: `const { getXataClient } = require("./xata");` in gatsby-node.js
* I paste the code below into `createUserAvatarNodes` in gatsby-node.js

```js
const createUserAvatarNodes = async (gatsbyUtils) => {

  const xata = getXataClient();

  const records = await xata.db.accounts.getAll();

  console.log(records);

}

```

That's all 😺

## WHY do I do a daily sub-task?

Because MY dev-brain practice is more piraty on a tiny sub-task than on the whole dev-task.

Try out a sub-task on your own dev-brain; it might make your practice more piraty 🏴‍☠️😺👍

ARR!

Cap'n Ola Vea

&nbsp;

**P.S**

