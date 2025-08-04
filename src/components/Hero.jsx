import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <h1>TASTY FOOD COMING TO YOU</h1>
            <p>
              Hungry? Our smart delivery app uses intelligent recommendations to get you exactly what you crave — no endless scrolling.
            </p>
            <div className="hero-buttons">
              {/* This button is now a Link that navigates to the restaurants page */}
              <Link to="/restaurants" className="yellow-btn">Order Now</Link>
              
              {/* This button now opens the modal */}
              <button className="red-btn" onClick={() => setShowModal(true)}>?</button>
            </div>
            <div className="stats">
              <div><h2>10k+</h2><p>Restaurants</p></div>
              <div><h2>70k+</h2><p>Customers</p></div>
              <div><h2>250k+</h2><p>Orders</p></div>
            </div>
          </div>
          <div className="hero-right">
            <img src="/Screenshot 2025-06-12 at 1.17.44 PM.png" alt="pizza" />
          </div>
        </div>
      </section>

      {/* This is the Modal JSX. It only appears if `showModal` is true. */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>×</button>
            <h2>How It Works</h2>
            <ol className="how-it-works-list">
              <li><span>1</span>Browse our top restaurants and categories.</li>
              <li><span>2</span>Select your favorite dishes and add them to the cart.</li>
              <li><span>3</span>Proceed to checkout for fast and reliable delivery!</li>
            </ol>
          </div>
        </div>
      )}
    </>
  );
}