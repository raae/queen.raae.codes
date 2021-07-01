const Stripe = require("stripe")
const { uniq } = require("lodash")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(request, response) {
  if (request.body.type !== "checkout.session.completed") {
    response.status(400).send(`Not a "checkout.session.completed"  event"`)
  } else {
    const sessionId = request.body.data.object.id

    const { line_items } = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    })

    const priceId = line_items.data[0].price.id

    const { metadata } = await stripe.prices.retrieve(priceId)

    let completedSessions = [sessionId]

    if (metadata.completed_sessions) {
      completedSessions = uniq([
        ...metadata.completed_sessions.split(","),
        sessionId,
      ])
    }

    metadata.available = metadata.total - completedSessions.length
    metadata.completed_sessions = completedSessions.join(",")

    await stripe.prices.update(priceId, {
      active: metadata.available > 0,
      metadata,
    })

    console.log(`Available ${metadata.available}`)

    response.status(200).json({ message: `Available ${metadata.available}` })
  }
}
