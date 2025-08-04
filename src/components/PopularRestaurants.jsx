import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// This line makes the API URL dynamic
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const PopularRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  
  useEffect(() => {
    const fetchPopularRestaurants = async () => {
      try {
        const response = await fetch(`${API_URL}/api/restaurants`);
        const data = await response.json();
        setRestaurants(data.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch popular restaurants:", err);
      }
    };
    fetchPopularRestaurants();
  }, []);

  return (
    <section className="popular-restaurants">
      <h2>Popular Restaurants</h2>
      <div className="restaurant-cards">
        {restaurants.map(restaurant => (
          <Link to={`/restaurants/${restaurant._id}`} key={restaurant._id} className="restaurant-card">
            <img src={restaurant.image} alt={restaurant.name} />
            <h3>{restaurant.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularRestaurants;