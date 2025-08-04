import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addItemToCart, removeItemFromCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price.replace('₹', ''));
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/restaurants" className="browse-restaurants-btn">Browse Restaurants</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                </div>
                <div className="cart-item-controls">
                   <p className="item-total">{`₹${Number(item.price.replace('₹', '')) * item.quantity}`}</p>
                   <div className="quantity-adjuster">
                    <button onClick={() => removeItemFromCart(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addItemToCart(item)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹50</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{calculateTotal() + 50}</span>
            </div>
            <button className="checkout-btn">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;