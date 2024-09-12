import React, { createContext, useReducer } from 'react';

export const CartContext = createContext();

const initialState = {
  cart: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
        return calculateTotals({ ...state, cart: updatedCart });
      } else {
        return calculateTotals({ ...state, cart: [...state.cart, action.payload] });
      }

    case 'UPDATE_QUANTITY':
      const updatedCart = state.cart.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      return calculateTotals({ ...state, cart: updatedCart });

    case 'REMOVE_FROM_CART':
      const filteredCart = state.cart.filter(item => item.id !== action.payload.id);
      return calculateTotals({ ...state, cart: filteredCart });

    default:
      return state;
  }
};

const calculateTotals = (state) => {
  const totalQuantity = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return { ...state, totalQuantity, totalAmount };
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};