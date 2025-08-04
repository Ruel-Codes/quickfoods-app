import React from 'react';

export default function Features() {
  return (
    <section className="features">
      <h2 className="features-title">Why Choose Us</h2>
      <div className="features-container">
        <div className="feature-box">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="Fast Delivery" />
          <h3>Fast Delivery</h3>
          <p>Get your food delivered in just minutes.</p>
        </div>
        <div className="feature-box">
          <img src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png" alt="Quality Food" />
          <h3>Quality Food</h3>
          <p>Enjoy meals made with fresh ingredients.</p>
        </div>
        <div className="feature-box">
          <img src="https://cdn-icons-png.flaticon.com/512/929/929426.png" alt="24/7 Service" />
          <h3>24/7 Service</h3>
          <p>We’re available any time, day or night.</p>
        </div>
      </div>
    </section>
  );
}
