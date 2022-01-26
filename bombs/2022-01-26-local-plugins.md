---
url: https://discord.com/channels/484383807575687178/484383808007962640/935562510839463976
---

PsyKzz — Yesterday at 4:51 PM
Hey All, we use Gatsby on for one of our sites that currently supports a small number of features.

As we plan to expand this site, more teams within the business will be looking to add features and contribute.

I've been looking at using plugins as a way to organise the features and allow teams to work independently from the main repo.

My question, are there any examples of other projects that already take this approach? Does this approach seem reasonable? Could i be overlooking something?
頭腦 — Today at 6:08 AM
hi
KarloPenguini — Today at 8:49 AM
As it stands, gatsby plugins are like modules in npm, anybody can run it aslong as that person has the same package.json file which npm references on what to install.
raae (queen.raae.codes) — Today at 11:28 AM
@PsyKzz you can also use local plugins to keep having everyone fighting for ownership of the root gatsby-node.js file etc.
PsyKzz — Today at 11:30 AM
That's the idea im hoping to achieve.

Im considering the following approach

- Shared components library that everyone can install
- Global / site-wide plugins
  - These provide auth, localization, etc
- Feature based plugins

Feature plugins would be in their own repo, which would allow teams to own their own workflows and effectively just need to release their plugin which would get validated as part of the site-wide ci.
raae (queen.raae.codes) — Today at 11:34 AM
Sounds like a plan, but would maybe start out with local plugins white you/team explore the boundaries for each plugin. Then move each into its own repo when it stabilizes.
PsyKzz — Today at 11:43 AM
Might sound weird, but can plugins have plugins?
raae (queen.raae.codes) — Today at 11:46 AM
Yes, but then they are for some reason referred to as themes. All you need to do is add a gatsby-config.js file.
