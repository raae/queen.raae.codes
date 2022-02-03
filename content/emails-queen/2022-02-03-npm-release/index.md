---
title: How to release a Gatsby Plugin (or anything really) to npm
image: ./npm-publish.png
emojii: 📦 ⬆️
---

I was sure releasing packages on npm was a super complex process! I made it into this thing only developers better than I was worthy of doing.

It turns out it's [super straightforward](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages); any folder of code with a [valid package.json](https://docs.npmjs.com/creating-a-package-json-file) may become an npm package.

1. Create a free account on [npmjs.com](https://www.npmjs.com/)
2. In your terminal, move into the folder you want to release as a package
3. Create `package.json` with `npm init` if needed
4. Type `npm publish` and follow the promps.

That's it; it will now be available for anyone anywhere to use 🤯

If the folder of code you decide to publish is worthy of becoming a package, though, that is another discussion altogether.

&nbsp;  
All the best,  
Queen Raae

&nbsp;  
**PS:** You probably want to automate this process, and we will look at that in [tonight's unauthorized and rum-fueled treasure hunt](https://youtu.be/eaZm9MC0GeE) in the sharky waters around the Gatsby islands.
