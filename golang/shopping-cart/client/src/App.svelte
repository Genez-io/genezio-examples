<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { FaSolidCartShopping, FaTrashCan } from "svelte-icons-pack/fa";
  import axios from "axios";

  import type { Product } from "./models";
  import type { CartItem } from "./models";
  import { ShoppingCartService } from "@genezio-sdk/shopping-cart";
  import { writable } from "svelte/store";
  import { Icon } from "svelte-icons-pack";

  let clearCartLoading: boolean = false;
  let deleteItemLoading: { [key: string]: boolean } = {};
  let addItemLoading: { [key: string]: boolean } = {};
  let productData: { products: Product[] } = { products: [] };
  let isCartVisible: boolean = false;
  let cartData: CartItem[] = [];
  let purchasedQuantity: number = 0;

  // Check if the token is set in localStorage
  let token = localStorage.getItem("token") || "";

  // If token is not set, generate a 32-character token
  if (!token) {
    token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem("token", token);
  }

  // Fetch the dummy products from the dummyjson API
  onMount(async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      productData = response.data;
      fetchCartData();
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  });

  // Fetch the cart contents when the cart modal is visible
  function fetchCartData() {
    ShoppingCartService.getCart(token)
      .then((cart: any) => {
        cartData = cart;
        purchasedQuantity = cart.length;
      })
      .catch((error) => {
        console.error("Error fetching or parsing cart data:", error);
      });
  }

  $: {
    fetchCartData();
  }

  // Toggle the cart modal
  function toggleCartModal() {
    isCartVisible = !isCartVisible;
  }

  async function handleBuyClick(product: Product) {
    addItemLoading[product.id] = true;

    try {
      await ShoppingCartService.addItemToCart(token, product.title);
      fetchCartData();
      purchasedQuantity += 1;
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }

    addItemLoading[product.id] = false;
  }

  async function handleDeleteItem(cartItem: CartItem) {
    deleteItemLoading[cartItem.title] = true;

    try {
      await ShoppingCartService.removeItemFromCart(token, cartItem.title);
      let cartDataRes: any = await ShoppingCartService.getCart(token);
      cartData = cartDataRes;
      purchasedQuantity -= 1;
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }

    deleteItemLoading[cartItem.title] = false;
  }

  async function handleClearCart() {
    clearCartLoading = true;

    try {
      await ShoppingCartService.deleteCart(token);
      let cartDataRes: any = await ShoppingCartService.getCart(token);
      cartData = cartDataRes;
      purchasedQuantity = 0;
    } catch (error) {
      console.error("Error clearing cart:", error);
    }

    clearCartLoading = false;
  }
</script>

<div class="App">
  <div class="bg-dark text-light p-3">
    <div class="container">
      <div class="row align-items-center">
        <div class="col">
          <h1>Product List</h1>
        </div>
        <div class="col text-right">
          <button class="btn btn-primary" on:click={toggleCartModal}>
            <Icon src={FaSolidCartShopping} />
            {#if purchasedQuantity > 0}
              <span class="m-2">{purchasedQuantity}</span>
            {/if}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="my-4">
    <div class="container">
      <div class="row justify-content-around">
        {#each productData.products as product (product.id)}
          <div class="col-md-4 mb-4">
            <div class="product-card">
              <img src={product.thumbnail} alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <button
                class="btn btn-primary"
                on:click={() => handleBuyClick(product)}
                disabled={addItemLoading[product.id]}
              >
                {#if addItemLoading[product.id]}
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                {:else}
                  Buy Now
                {/if}
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  {#if isCartVisible}
    <div class="cart-overlay">
      <div class="cart-modal bg-white p-4 rounded shadow-lg">
        <h2 class="mb-4 center">Shopping Cart</h2>
        <ul class="list-unstyled">
          {#if cartData.length > 0}
            {#each cartData as cartItem, index (cartItem.title ? cartItem.title : index)}
              <li class="mb-3">
                <div>
                  <span>{cartItem.title}</span>
                  <span class="m-2">Quantity: {cartItem.count}</span>
                  <button
                    class="btn btn-danger btn-sm m-2"
                    on:click={() => handleDeleteItem(cartItem)}
                    disabled={deleteItemLoading[cartItem.title]}
                  >
                    {#if deleteItemLoading[cartItem.title]}
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    {:else}
                      <Icon src={FaTrashCan} />
                    {/if}
                  </button>
                </div>
              </li>
            {/each}
          {:else}
            <li class="empty-cart">Your cart is empty</li>
          {/if}
        </ul>
        {#if cartData.length > 0}
          <button
            class="btn btn-primary m-2"
            on:click={handleClearCart}
            disabled={clearCartLoading}
          >
            {#if clearCartLoading}
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            {:else}
              Clear Cart
            {/if}
          </button>
        {/if}
        <button class="btn btn-primary m-2" on:click={toggleCartModal}>
          Close
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .bg-dark {
    background-color: #343a40;
  }

  .text-light {
    color: #fff;
  }

  .container {
    max-width: 960px;
    margin: 0 auto;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .col {
    flex: 1;
  }

  .text-right {
    text-align: right;
  }

  .my-4 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .mb-3 {
    margin-bottom: 0.75rem;
  }

  .m-2 {
    margin: 0.5rem;
  }

  .p-3 {
    padding: 1rem;
  }

  .product-card {
    border: 1px solid #ccc;
    padding: 1rem;
    text-align: center;
  }

  .product-card img {
    max-width: 100%;
    height: auto;
  }

  .empty-cart {
    color: #999;
  }

  .cart-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }

  .cart-modal {
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
