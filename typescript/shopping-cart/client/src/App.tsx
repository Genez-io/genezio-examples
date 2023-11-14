import { useState, useEffect } from 'react';
import './App.css';
import ProductCard from './ProductCard';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import { CartItem, Product } from './models/products';
import { ShoppingCartService } from '@genezio-sdk/shopping-cart_us-east-1';

function App() {
  const [productData, setProductData] = useState<{ products: Product[] }>({ products: [] });
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Add a state to store the cart data from ShoppingCartService
  const [cartData, setCartData] = useState<CartItem[]>([]);

  // Check if the token is set in localStorage
  let token = localStorage.getItem('token');

  // If token is not set, generate a 32-character token
  if (!token) {
    // generate a random token
    token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem("token", token);
  }

  useEffect(() => {
    // Fetch the JSON data from the URL
    axios.get('https://dummyjson.com/products')
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    // Fetch the cart data when the modal is opened
    if (isCartVisible) {
      // Call your ShoppingCartService.getCart method to fetch the cart data
      if (!token) {
        console.log("No token found");
        return;
      }

      const fetchCartData = async () => {
        try {
          if (!token) {
            console.log("No token found");
            return;
          }
          const cart = await ShoppingCartService.getCart(token);
          setCartData(cart);
        } catch (error) {
          console.error('Error fetching or parsing cart data:', error);
        }
      };

      fetchCartData();
    }
  }, [isCartVisible, token]);

  const toggleCartModal = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleDeleteItem = async (cartItem: CartItem) => {
    // You can implement your delete logic here
    console.log(`Delete ${cartItem.title}`);
    if (!token) {
      console.log("No token found");
      return;
    }
    await ShoppingCartService.removeItemFromCart(token, cartItem.title);

    // Update the cart data
    const updatedCartData = await ShoppingCartService.getCart(token);
    setCartData(updatedCartData);
  };

  const handleClearCart = async () => {
    if (!token) {
      console.log("No token found");
      return;
    }
    await ShoppingCartService.deleteCart(token);

    // Update the cart data
    const updatedCartData = await ShoppingCartService.getCart(token);
    setCartData(updatedCartData);
  };
  return (
    <div className="App">
       <div className="header">
        <h1>Product List</h1>
        <button className="cart-button" onClick={toggleCartModal}>
            <FaShoppingCart />
        </button>
      </div>
      <div className="product-list">
        {productData.products.map((product) => (
          <ProductCard key={product.id} product={product} token={token} />
        ))}
      </div>
      {isCartVisible && (
        <div className="cart-overlay">
            <div className="cart-modal">
            <h2>Shopping Cart</h2>
            <ul>
            {cartData.length > 0 ? (
              cartData.map((cartItem, index) => (
                <li key={index} className='cart-item'>
                  <span>{cartItem.title} Quantity: {cartItem.count}</span>
                  <button className="delete-button" onClick={() => handleDeleteItem(cartItem)}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48" className="trash-icon">
                    <path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"></path>
                  </svg>
                </button>
                </li>
              ))
              ) : (
                <li className="empty-cart">Your cart is empty</li>
            )}
            </ul>
            {cartData.length > 0 ? (
            <button className="clear-cart-button" onClick={handleClearCart}>
              Clear Cart
            </button>) : null}
            <button className="close-button" onClick={toggleCartModal}>
              Close
            </button>
            </div>
        </div>
        )}
    </div>
  );
}

export default App;
