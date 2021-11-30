---
title: Accept donations with @raae/gatsby-plugin-donations
emojii: 📦 💰
---

Yesterday's tiny task on [our unauthorized and rum-fueled treasure hunts in the sharky waters around the Gatsby islands](https://youtu.be/lVMNrThbQOM) was "accept donations".

We did so by adding soon-to-be-officially released plugin: [@raae/gatsby-plugin-donations](https://www.npmjs.com/package/@raae/gatsby-plugin-donations).

The plugin adds a Gatsby Serverless Function you may use to accept pay-what-you-want donations. No ready-made components yet...

[![](https://embed.filekitcdn.com/e/p8jpRT3pfuWiYaxxFBd6tZ/5x35VSxXEfp4U9uLZB7mzm/email)](https://youtu.be/lVMNrThbQOM)

I wanted to test out the developer experience myself. Having Ola walk me through the steps in the readme and keep an eye out for areas to improve.

Pretty happy with the results, but some clarification is needed before it's ready for an official release.

We also tackled an issue reported by an early tester:

404 error when using the supplied example code...

Turns out he was using Gatsby version 3.2, and I had somehow put ^3.0.0 as a valid peer dependency when in fact, support for Gatsby Serverless Functions came with version 3.7 🤦‍♀️

Where was Paul, you might ask? He was living out his dream as an Englishman in New York.

[![](https://embed.filekitcdn.com/e/p8jpRT3pfuWiYaxxFBd6tZ/8U3Jj1493FzCnBg4prnk1c/email)](https://twitter.com/raae/status/1463979984997990406)

If you decide to test out the new plugin, I would love to hear what you think over in the discussions.

All the best,  
Queen Raae

**PS:** This was the last week of Season 2 of ​Gatsby Deep Dives with Queen Raae and the Nattermob Pirates.

**PPS:** Next week we'll be back with a new show where I'll support Mirjam as she builds out the new [conferencebuddy.io](https://www.conferencebuddy.io/) site with Gatsby.
