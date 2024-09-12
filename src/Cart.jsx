import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './App.css';

const Cart = () => {
  const { cart, totalQuantity, totalAmount, dispatch } = useContext(CartContext);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <h4>{item.title}</h4>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                min="1"
              />
              <p>Subtotal: ${item.price * item.quantity}</p>
              <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))}
          <div className="total-section">
            <h3>Total Quantity: {totalQuantity}</h3>
            <h3>Total Amount: ${totalAmount}</h3>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;