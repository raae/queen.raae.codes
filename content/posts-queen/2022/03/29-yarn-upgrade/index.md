---
title: Upgrade all Gatsby packages in one command with yarn
emojii: 📦 🪄
tags: snippet, yolo, yarn
---

Short tip from today's coding session where I needed to make sure all Gatsby related packages were up to date:

```shell
yarn upgrade --pattern gatsby --latest
```

It will upgrade all packages with gatsby in its name to the latest version. Check out the [yarn upgrade docs](https://classic.yarnpkg.com/lang/en/docs/cli/upgrade/) for more options.

If you want to yolo upgrade _everything_ to the latest version, go nuts with:

```shell
yarn upgrade --latest
```

&nbsp;  
All the best,  
Queen Raae
