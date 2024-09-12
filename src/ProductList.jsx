import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import products from './products.json';
import './App.css';

const ProductList = () => {
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
  };

  return (
    <div className="product-list">
      <h2>React useContext Task</h2>
      <div className="product-grid">
        {products.products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;