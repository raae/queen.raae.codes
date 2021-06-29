const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(request, response) {
  const { productId } = request.query

  if (!productId) {
    response.status(400).send(`A product id is required`)
  } else {
    const { data } = await stripe.prices.list({
      product: productId,
    })

    response.status(200).json(
      data.reduce((acc, { id, metadata }) => {
        acc[id] = {
          total: metadata.total || 100,
          available: metadata.available || metadata.total,
        }
        return acc
      }, {})
    )
  }
}
