import { GenezioDeploy } from "@genezio/types"
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


@GenezioDeploy()
export class StripeHandler {
  async createCheckoutSession() {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          // more info: https://stripe.com/docs/checkout/quickstart
          price: process.env.PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_DOMAIN}?success=true`,
      cancel_url: `${process.env.FRONTEND_DOMAIN}?canceled=true`,
    });

    // check for errors
    if (session.error) {
      console.log(session.error);
      return {error: session.error};
    }

    return {url: session.url};
  }

}
