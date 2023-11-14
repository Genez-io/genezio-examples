import React from 'react';
import { Product } from './models/products';
import { ShoppingCartService } from "@genezio-sdk/shopping-cart_us-east-1"

interface ProductCardProps {
  product: Product;
  token: string | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, token }) => {
  const handleBuyClick = async () => {
    // You can implement your buy logic here, e.g., add the product to a cart.
    console.log(`Buy ${product.title}`);
    if (!token) {
      console.log("No token found");
      return;
    }
    await ShoppingCartService.addItemToCart(token, product.title)
  };

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <button className="buy-button" onClick={handleBuyClick}>
        Buy Now!
      </button>
    </div>
  );
};

export default ProductCard;
