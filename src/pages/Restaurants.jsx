import React, {useState , useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Restaurants.css';

// This line makes the API URL dynamic
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const cuisineFilter = searchParams.get('cuisine');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const apiUrl = cuisineFilter
          ? `${API_URL}/api/restaurants?cuisine=${cuisineFilter}`
          : `${API_URL}/api/restaurants`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [cuisineFilter]);

  if (loading) return <div className="restaurants-page"><p>Loading restaurants...</p></div>;
  if (error) return <div className="restaurants-page"><p>Error: {error}</p></div>;

  return (
    <div className="restaurants-page">
      <h2>{cuisineFilter ? `${cuisineFilter} Restaurants` : 'All Restaurants'} in Patiala</h2>
      {restaurants.length === 0 && !loading && <p>No restaurants found for this category.</p>}
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <Link to={`/restaurants/${restaurant._id}`} key={restaurant._id} className="restaurant-card">
              <img src={restaurant.image} alt={restaurant.name} />
              <h3>{restaurant.name}</h3>
              <p>{restaurant.cuisine}</p>
              <p>⭐ {restaurant.rating}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}