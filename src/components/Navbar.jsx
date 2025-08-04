import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; // 1. Import HashLink
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartItems } = useCart();

  return (
    <nav>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1>QuickFoods</h1>
      </Link>
      
      <ul>
        <li><Link to="/">Home</Link></li>
        
        {/* 2. Change this Link to a HashLink */}
        <li>
          <HashLink smooth to="/#food-categories">
            Explore Food
          </HashLink>
        </li>

        <li><Link to="/restaurants">Restaurants</Link></li>
        
        <li className="cart-link-container">
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </Link>
        </li>
      </ul>
      <div className="navbuttons">
        <button>Login</button>
        <button>Signup</button>
      </div>
    </nav>
  );
}