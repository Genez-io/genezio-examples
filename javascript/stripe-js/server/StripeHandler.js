import { GenezioDeploy } from "@genezio/types";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const red_color = "\x1b[31m%s\x1b[0m";
const missing_env_key_error =
  "ERROR: Your STRIPE_SECRET_KEY environment variable is not properly set, go to https://stripe.com/docs/keys  to learn how to obtain a Stripe API key";
const missing_env_domain_error =
  "ERROR: Your FRONTEND_DOMAIN environment variable is not properly set, use http://localhost:3000/ for local development and once you deploy use your public frontend domain";

@GenezioDeploy()
export class StripeHandler {
  async createCheckoutSession() {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.log(red_color, missing_env_key_error);
      return { error: missing_env_key_error };
    }
    if (!process.env.FRONTEND_DOMAIN) {
      console.log(red_color, missing_env_domain_error);
      return { error: missing_env_domain_error };
    }
    const product = await stripe.products.create({
      name: "T-shirt",
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 2000,
      currency: "usd",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          // more info: https://stripe.com/docs/checkout/quickstart

          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_DOMAIN}?success=true`,
      cancel_url: `${process.env.FRONTEND_DOMAIN}?canceled=true`,
    });

    // check for errors
    if (session.error) {
      console.log(session.error);
      return { error: session.error };
    }

    return { url: session.url };
  }
}
