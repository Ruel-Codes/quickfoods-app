// File: src/context/CartContext.jsx

import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Use '_id' to find items, which comes from MongoDB
      const existingCartItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // Use '_id' when adding a new item
        updatedItems = state.items.concat({ ...action.payload, quantity: 1 });
      }
      return { ...state, items: updatedItems };
    }
    case 'REMOVE_ITEM': {
      // Use '_id' to find items
      const existingCartItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      const existingItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingItem.quantity === 1) {
        // Use '_id' to filter
        updatedItems = state.items.filter(item => item._id !== action.payload._id);
      } else {
        const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return { ...state, items: updatedItems };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItemFromCart = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  const contextValue = {
    cartItems: state.items,
    addItemToCart,
    removeItemFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};