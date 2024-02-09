import { GenezioDeploy } from "@genezio/types";
import Redis from "ioredis";

export type CartItem = {
  title: string;
  count: string;
};

@GenezioDeploy()
export class ShoppingCartService {
  client: Redis;

  constructor() {
    if (!process.env.UPSTASH_REDIS_URL) {
      throw new Error(
        "It seems that UPSTASH_REDIS_URL is not set in the `.env` file. Check the documentation https://genezio.com/docs/integrations/upstash-redis to learn how to integrate with Upstash Redis into your project."
      );
    }

    this.client = new Redis(process.env.UPSTASH_REDIS_URL);
  }

  // increment item count by 1 for a given item corresponding to the sessionId
  async addItemToCart(sessionId: string, item: string): Promise<string> {
    await this.client.hincrby("cart:" + sessionId, item, 1).catch((err) => {
      throw new Error(err);
    });

    return "success";
  }

  // get all items from the map corresponding to the sessionId
  async getCart(sessionId: string): Promise<CartItem[]> {
    const cart = await this.client.hgetall("cart:" + sessionId).catch((err) => {
      throw new Error(err);
    });
    // check if cart is empty
    if (Object.keys(cart).length === 0) {
      console.error("Cart is empty");
      return [];
    }

    // map cart items to an array of CartItem objects
    const cartItems: CartItem[] = [];
    for (const key in cart) {
      const item = {
        title: key,
        count: cart[key]
      };
      cartItems.push(item);
    }
    return cartItems;
  }

  // decrement item count by 1 for a given item corresponding to the sessionId
  async removeItemFromCart(sessionId: string, item: string): Promise<string> {
    // check if item exists in the map
    const itemExists = await this.client
      .hexists("cart:" + sessionId, item)
      .catch((err) => {
        throw new Error(err);
      });
    if (!itemExists) {
      throw new Error("Item does not exist");
    }

    await this.client.hincrby("cart:" + sessionId, item, -1).catch((err) => {
      throw new Error(err);
    });

    // check if item count is 0 for a specific item, if so delete the entry from the map
    const itemCount = await this.client
      .hget("cart:" + sessionId, item)
      .catch((err) => {
        throw new Error(err);
      });
    if (itemCount && parseInt(itemCount) === 0) {
      await this.client.hdel("cart:" + sessionId, item).catch((err) => {
        throw new Error(err);
      });
    }
    return "success";
  }

  // delete the cart corresponding ßto the sessionId
  async deleteCart(sessionId: string): Promise<string> {
    // check if cart exists in the database
    const cartExists = await this.client
      .exists("cart:" + sessionId)
      .catch((err) => {
        throw new Error(err);
      });
    if (!cartExists) {
      throw new Error("Cart does not exist");
    }

    await this.client.del("cart:" + sessionId).catch((err) => {
      throw new Error(err);
    });

    return "success";
  }
}
