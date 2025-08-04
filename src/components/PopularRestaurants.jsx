import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Import necessary hooks and Link

export default function PopularRestaurants() {
  // 2. Add state to hold the restaurant data
  const [restaurants, setRestaurants] = useState([]);

  // 3. Fetch data from your API when the component loads
  useEffect(() => {
    const fetchPopularRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/restaurants');
        const data = await response.json();
        setRestaurants(data.slice(0, 4)); // Get just the first 4
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
        {/* 4. Map over the real data from the state */}
        {restaurants.map((restaurant) => (
          // 5. Wrap each card in a Link to its specific menu page
          <Link to={`/restaurants/${restaurant._id}`} key={restaurant._id} className="restaurant-card">
            <img src={restaurant.image} alt={restaurant.name} />
            <h3>{restaurant.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}