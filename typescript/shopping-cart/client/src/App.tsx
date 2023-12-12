import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Row, Spinner } from 'reactstrap';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import axios from 'axios';

import './App.css'
import { CartItem, Product } from './models';

import { ShoppingCartService } from '@genezio-sdk/shopping-cart_us-east-1';

function App() {
  const [clearCartLoading, setClearCartLoading] = useState(false);
  const [deleteItemLoading, setDeleteItemLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const [addItemLoading, setAddItemLoading] = useState<{
    [key: number]: boolean;
  }>({});
  const [productData, setProductData] = useState<{ products: Product[] }>({
    products: [],
  });
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [purchasedQuantity, setPurchasedQuantity] = useState(0);

  // Check if the token is set in localStorage
  let token = localStorage.getItem('token') as string;

  // If token is not set, generate a 32-character token
  if (!token || token === '' || token === 'undefined') {
    token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem('token', token);
  }

  // Fetch the dummy products from the dummyjson API
  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // Fetch the cart contents when the cart modal is visible
  useEffect(() => {
    if (isCartVisible) {
      const fetchCartData = async () => {
        try {
          // Call your ShoppingCartService.getCart method to the contents of the cart
          const cart = await ShoppingCartService.getCart(token);
          setCartData(cart);
        } catch (error) {
          console.error('Error fetching or parsing cart data:', error);
        }
      };

      fetchCartData();
    }
  }, [isCartVisible, token]);

  // Toggle the cart modal
  const toggleCartModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCartVisible(!isCartVisible);
  };

  const handleBuyClick = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault();

    // Set loading state to true to show the spinner
    setAddItemLoading((prevStates) => ({ ...prevStates, [product.id]: true }));

    // You can implement your buy logic here, e.g., add the product to a cart
    await ShoppingCartService.addItemToCart(token, product.title);

    // Update the local state to reflect the purchased quantity
    setPurchasedQuantity((prevQuantity) => prevQuantity + 1);

    // Set loading state to false to hide the spinner
    setAddItemLoading((prevStates) => ({ ...prevStates, [product.id]: false }));
  };

  const handleDeleteItem = async (e: React.MouseEvent, cartItem: CartItem) => {
    e.preventDefault();

    // Set loading state to true to show the spinner
    setDeleteItemLoading((prevState) => ({
      ...prevState,
      [cartItem.title]: true,
    }));

    await ShoppingCartService.removeItemFromCart(token, cartItem.title);

    // You can implement your delete logic here
    const updatedCartData = await ShoppingCartService.getCart(token);
    setCartData(updatedCartData);

    // Update the local state to reflect the purchased quantity
    setPurchasedQuantity((prevQuantity) => prevQuantity - 1);

    // Set loading state to false to hide the spinner
    setDeleteItemLoading((prevState) => ({
      ...prevState,
      [cartItem.title]: false,
    }));
  };

  const handleClearCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Set loading state to true to show the spinner
    setClearCartLoading(true);

    // You can implement your clear cart logic here
    await ShoppingCartService.deleteCart(token);

    // Update the cart data
    const updatedCartData = await ShoppingCartService.getCart(token);
    setCartData(updatedCartData);

    // Update the local state to reflect the purchased quantity
    setPurchasedQuantity(0);

    // Set loading state to false to hide the spinner
    setClearCartLoading(false);
  };

  return (
    <div className="App">
      <div className="bg-dark text-light p-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h1>Product List</h1>
            </div>
            <div className="col text-right">
              <Button color="primary" onClick={(e) => toggleCartModal(e)}>
                <FaShoppingCart />
                {purchasedQuantity > 0 && (
                  <span className="m-2">{purchasedQuantity}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Container className="my-4">
        <Row className="justify-content-around">
          {productData.products.map((product) => (
            <Col key={product.id} md="4" className="mb-4">
              <div className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating}</p>
                <Button
                  color="primary"
                  onClick={(e) => handleBuyClick(e, product)}
                  disabled={addItemLoading[product.id]}
                >
                  {addItemLoading[product.id] ? (
                    <Spinner size="sm" color="light" />
                  ) : (
                    'Buy Now'
                  )}
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {isCartVisible && (
        <div
          className="cart-overlay d-flex justify-content-center align-items-center position-fixed top-0 left-0 w-100 h-100"
          style={{ background: 'rgba(0, 0, 0, 0.7)' }}
        >
          <div className="cart-modal bg-white p-4 rounded shadow-lg">
            <h2 className="mb-4 center">Shopping Cart</h2>
            <ul className="list-unstyled">
              {cartData.length > 0 ? (
                cartData.map((cartItem, index) => (
                  <li key={index} className="mb-3">
                    <div>
                      <span>{cartItem.title}</span>
                      <span className="m-2">Quantity: {cartItem.count}</span>
                      <Button
                        color="danger"
                        size="sm"
                        className="m-2"
                        onClick={(e) => handleDeleteItem(e, cartItem)}
                        disabled={deleteItemLoading[cartItem.title]}
                      >
                        {deleteItemLoading[cartItem.title] ? (
                          <Spinner size="sm" color="light" />
                        ) : (
                          <FaTrash />
                        )}
                      </Button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="empty-cart">Your cart is empty</li>
              )}
            </ul>
            {cartData.length > 0 ? (
              <Button
                color="primary"
                className="m-2"
                onClick={(e) => handleClearCart(e)}
                disabled={clearCartLoading}
              >
                {clearCartLoading ? (
                  <Spinner size="sm" color="light" />
                ) : (
                  'Clear Cart'
                )}
              </Button>
            ) : null}
            <Button
              color="primary"
              className="m-2"
              onClick={(e) => toggleCartModal(e)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
