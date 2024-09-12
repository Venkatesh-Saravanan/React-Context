import React from 'react';
import { CartProvider } from './CartContext';
import ProductList from './ProductList';
import Cart from './Cart';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="container">
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;