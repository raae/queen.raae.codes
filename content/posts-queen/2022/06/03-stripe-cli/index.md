---
title: How to trigger a Stripe (checkout.session.completed) Event with metadata
emojii: 🏷 🪝
tags: Stripe CLI, webhook, serverless
brands: Stripe
---

We had fun with the [Stripe CLI](https://stripe.com/docs/cli) in yesterday's [unauthorized and rum-fueled treasure hunt](https://youtu.be/Wqilgl_V7FA) in the sharky waters around the Gatsby islands while refactoring the Stripe Webhook of our price-winning [Gatsby FuncJam entry](https://github.com/queen-raae/gatsby-funcjam-21/pull/4) to use the raw body for Stripe verification.

[![YouTube Screengrab of crazy looking queen](./youtube-screengrab_lol.jpg "Caption this 🤪")](https://youtu.be/Wqilgl_V7FA)

## The What?

Trigger Stripe Checkout Session with metadata

## The Why?

Sometimes your Stripe Webhook expects there to be metadata attached to the Checkout Session. In our case, we want to grant access to a private Github repository and therefore add the Github username to the Checkout Session.

## The How

You can add or override the data on resources when triggering events using [the add flag](https://stripe.com/docs/cli/trigger#trigger-add).

The documentation lets us know:

```sh
--add [resource]:[path1].[path2]=[value]
```

To add metadata to a Stripe Checkout Session, `resource` should be swapped for "checkout_session `path1` for "metadata" and `path2` for your custom metadata key. In our case, "github":

```sh
--add checkout_session:metadata.github=olavea
```

Then we use the above when triggering events, such as "checkout.session.completed":

```sh
stripe trigger checkout.session.completed --add checkout_session:metadata.github=olavea
```

&nbsp;
I had to upgrade my Stripe CLI to get this functionality, so I believe this is a new addition in the last year or so.

&nbsp;  
All the best,  
Queen Raae
