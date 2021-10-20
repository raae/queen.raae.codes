import Stripe from "stripe";

export default (stripeKey = process.env.STRIPE_SECRET_KEY) => {
  const stripe = Stripe(stripeKey);

  const log = (...args) => {
    console.log("Stripe:", ...args);
  };

  const createSession = async ({
    username,
    successUrl,
    cancelUrl,
    priceId,
  }) => {
    log("createSession", username);

    // Stripe docs: https://stripe.com/docs/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        github: username,
      },
    });

    return session;
  };

  const retrieveSession = async ({ id }) => {
    log("retrieveSession", id);

    // Stripe docs: https://stripe.com/docs/api/checkout/sessions/retrieve
    const session = await stripe.checkout.sessions.retrieve(id);

    return session;
  };

  return {
    createSession,
    retrieveSession,
  };
};
