import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Restaurant from './models/Restaurant.js';
import MenuItem from './models/MenuItem.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// ROUTE 1: GET ALL RESTAURANTS (WITH CUISINE FILTER)
app.get('/api/restaurants', async (req, res) => {
  try {
    const cuisineFilter = req.query.cuisine
      ? { cuisine: { $regex: req.query.cuisine, $options: 'i' } }
      : {};
    
    const restaurants = await Restaurant.find(cuisineFilter);
    res.status(200).json(restaurants);
  } catch (error)
    {
    res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
  }
});

// ROUTE 2: GET A SINGLE RESTAURANT BY ID
app.get('/api/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) {
            res.status(200).json(restaurant);
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurant', error: error.message });
    }
});

// ROUTE 3: GET THE MENU FOR A SPECIFIC RESTAURANT
app.get('/api/restaurants/:id/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ restaurant: req.params.id });
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu', error: error.message });
    }
});


const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB successfully.');

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();