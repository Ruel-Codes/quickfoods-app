import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Menu.css';
import { useCart } from '../context/CartContext';

// This line makes the API URL dynamic
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const Menu = () => {
  const { restaurantId } = useParams();
  const { cartItems, addItemToCart, removeItemFromCart } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetailsAndMenu = async () => {
      try {
        setLoading(true);
        const [resDetails, resMenu] = await Promise.all([
          fetch(`${API_URL}/api/restaurants/${restaurantId}`),
          fetch(`${API_URL}/api/restaurants/${restaurantId}/menu`)
        ]);

        if (!resDetails.ok || !resMenu.ok) {
          throw new Error('Could not fetch data for this restaurant.');
        }

        const detailsData = await resDetails.json();
        const menuData = await resMenu.json();

        setRestaurant(detailsData);
        setMenuItems(menuData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailsAndMenu();
  }, [restaurantId]);
  
  // ... (the rest of the component remains the same)

  const getQuantityById = (id) => {
    const item = cartItems.find(cartItem => cartItem._id === id);
    return item ? item.quantity : 0;
  };

  if (loading) return <div className="menu-page"><p>Loading menu...</p></div>;
  if (error) return <div className="menu-page"><p>Error: {error}</p></div>;
  if (!restaurant) return <div className="menu-page"><p>Restaurant not found</p></div>;

  return (
    <div className="menu-page">
      <div className="restaurant-header">
        <img src={restaurant.image} alt={restaurant.name} className="restaurant-header-img" />
        <div className="restaurant-header-info">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.cuisine}</p>
          <div className="restaurant-header-details">
            <span className="rating">⭐ {restaurant.rating}</span>
            <span>30-40 mins</span>
            <span>₹800 for two</span>
          </div>
        </div>
      </div>
      <div className="menu-container">
        <h2>Full Menu</h2>
        <div className="menu-items-list">
          {menuItems.map(item => {
            const quantity = getQuantityById(item._id);
            return (
              <div className="menu-item-card" key={item._id}>
                <div className="menu-item-info">
                  <h4>{item.name}</h4>
                  <p className="price">{item.price}</p>
                  <p className="description">{item.description}</p>
                </div>
                {quantity === 0 ? (
                  <button className="add-button" onClick={() => addItemToCart(item)}>
                    ADD
                  </button>
                ) : (
                  <div className="quantity-adjuster" style={{borderWidth: '2px', borderColor: '#ed290a'}}>
                    <button onClick={() => removeItemFromCart(item)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => addItemToCart(item)}>+</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;