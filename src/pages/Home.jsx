import Hero from '../components/Hero';
import Features from '../components/Features';
import FoodCategories from '../components/FoodCategories';
import NearbyRestaurants from '../components/NearbyRestaurants';
import PopularRestaurants from '../components/PopularRestaurants';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <FoodCategories />
      <NearbyRestaurants />
      <PopularRestaurants />
    </>
  );
};

export default Home;
