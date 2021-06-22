const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(request, response) {
  const sig = request.headers["stripe-signature"]

  console.log("body", request.rawBody)

  try {
    const event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    console.log("event", event)
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`)
    response.status(400).send(`Webhook Error: ${err.message}`)
  }
}
