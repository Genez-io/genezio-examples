import React, { useState, useEffect } from "react";
import "./App.css";
import { StripeHandler } from "./sdk/stripeHandler.sdk";

async function getCheckoutSession(e) {
  e.preventDefault();
  // Call your backend to create the Checkout session.
  const res = await StripeHandler.createCheckoutSession();

  if (res.error) {
    console.log(res.error);
    return;
  }

  console.log(res);

  // When the customer clicks on the button, redirect them to Checkout.
  window.location.replace(res.url);
}

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://genez.io/images/capy.webp"
        alt="Genezio capybara"
      />
      <div className="description">
      <h5>20.00 EUR</h5>
      </div>
    </div>
      <button type="button"
        onClick={(e) => getCheckoutSession(e)}
       >
        Checkout
      </button>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed!");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <div className="App" style={{marginTop: "5em"}}>
      {message ? (
        <Message message={message} />
      ) : (
        <ProductDisplay />
      )}
    </div>
  );
}