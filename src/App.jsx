// File: src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Restaurants from './pages/Restaurants';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext'; // 1. Import CartProvider

const App = () => {
  return (
    // 2. Wrap everything inside CartProvider
    <CartProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:restaurantId" element={<Menu />} /> 
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  );
};

export default App;