---
title: Stripe Event validation in a Gatsby Serverless Function
emojii: λ 💰
tags: serverless, lamda, raw body, webhook
brands: Stripe
---

If you are new to serverless, you might have thought nothing of [yesterday's "Using Http Request Body" example](/2022-05-18-dynamic-serverless/).

```js
export default function handler(req, res) {
  const { city, year } = req.body;
  res.send(`You time-travelled to ${city}, in year ${year}`);
}
```

But having the body served to you automagically as json, when it makes sense, is something I really like about Gatsby Functions. In most other serverless implementations, you have to parse it yourself.

However, when it comes to verifying the signature of a webhook using a third-party SDK, not so much! Most signature checks require access to the raw body.

And for the longest time, we could not access the raw body in a Gatsby Function, but with the release of Gatbsy v4.14, we can 🎉

To control the `body-parser` middleware export an [object named `config`](https://www.gatsbyjs.com/docs/reference/functions/middleware-and-helpers/#accessing-body-as-a-buffer).

```js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

// Export a config object
// to configure the bodyParser
export const config = {
  bodyParser: {
    raw: {
      type: `*/*`,
    },
  },
};

export default function handler(req, res) {
  try {
    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    // Handle the verified event,
    // event data can be trusted
    switch (event.type) {
      case "checkout.session.completed":
        console.log("CheckoutSession completed, fulfill the order!");
        // Handle the event
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200);
  } catch (err) {
    console.warn(err.message);
    res.status(400);
  }
}
```

~~Unfortunately, I cannot seem to make this work locally, but I have verified that it works on Gatsby Cloud. I will, of course, follow up with Gatsby to figure out what's up. Is it a feature? Or a bug? I know my opinion on the matter 😬~~

Update: [Raw body works in develop from v4.16](/2022-06-01-raw-body-fix/)

&nbsp;  
All the best,  
Queen Raae
