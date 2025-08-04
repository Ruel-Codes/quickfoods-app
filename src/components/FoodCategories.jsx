import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Pizza', image: '/pizza.png' },
    { name: 'Burger', image: '/burger.png' },
    { name: 'Sushi', image: '/sushi.png' },
    { name: 'Biryani', image: '/biryani.png' }
];

const FoodCategories = () => {
    return (
        // Add the id="food-categories" here
        <section className="food-categories" id="food-categories">
            <h2>Top Food Categories</h2>
            <div className="category-cards">
                {categories.map(category => (
                    <Link to={`/restaurants?cuisine=${category.name}`} key={category.name} className="card">
                        <img src={category.image} alt={category.name} />
                        <h3>{category.name}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FoodCategories;