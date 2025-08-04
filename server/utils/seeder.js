// File: server/utils/seeder.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from '../models/Restaurant.js';
import MenuItem from '../models/MenuItem.js';

dotenv.config();

// Final list of 12 restaurants with your requested image links
const restaurants = [
    { name: "Domino's Pizza", cuisine: 'Pizza, Italian', rating: 4.5, image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Sagar Ratna', cuisine: 'South Indian', rating: 4.6, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Behrouz Biryani', cuisine: 'Biryani, Mughlai', rating: 4.7, image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Burger King', cuisine: 'Burger, American', rating: 4.3, image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Wow! Momo', cuisine: 'Momos, Tibetan', rating: 4.4, image: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Starbucks', cuisine: 'Coffee, Beverages, Cafe', rating: 4.6, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Barbeque Nation', cuisine: 'BBQ, North Indian', rating: 4.9, image: 'https://images.pexels.com/photos/2092916/pexels-photo-2092916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Kyoto Sushi', cuisine: 'Japanese, Sushi', rating: 4.8, image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'KFC', cuisine: 'Fried Chicken, Burger', rating: 4.3, image: 'https://www.tasteofhome.com/wp-content/uploads/2024/09/Buttermilk-Fried-Chicken_EXPS_FT24_4371_JR_0904_3_RMS.jpg?w=892' }, // YOUR LINK
    { name: 'Haldiram\'s', cuisine: 'North Indian, Sweets', rating: 4.5, image: 'https://media.istockphoto.com/id/979914742/photo/chole-bhature-or-chick-pea-curry-and-fried-puri-served-in-terracotta-crockery-over-white.jpg?s=612x612&w=0&k=20&c=OLAw-ZleN1UVaa468OlPSAc6dkz2sjehxWevbvZQNew=' },
    { name: 'Baskin Robbins', cuisine: 'Ice Cream, Desserts', rating: 4.7, image: 'https://images.pexels.com/photos/1352296/pexels-photo-1352296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Subway', cuisine: 'Sandwich, Healthy', rating: 4.4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqFPyg6N-Z51ndufYvBvyN-oUe8tMc4IxOrw&s' }, // YOUR LINK
];

const menus = {
  "Domino's Pizza": [{ name: 'Margherita Pizza', price: '₹450'}, { name: 'Pepperoni Passion', price: '₹550'}],
  "Sagar Ratna": [{ name: 'Masala Dosa', price: '₹200'}, { name: 'Idli Sambhar', price: '₹150'}],
  "Behrouz Biryani": [{ name: 'Dum Gosht Biryani', price: '₹650'}, { name: 'Murgh Makhani Biryani', price: '₹600'}],
  "Burger King": [{ name: 'Whopper', price: '₹350'}, { name: 'Crispy Chicken Burger', price: '₹300'}],
  "Wow! Momo": [{ name: 'Steamed Chicken Momos', price: '₹180'}, { name: 'Pan Fried Paneer Momos', price: '₹200'}],
  "Starbucks": [{ name: 'Java Chip Frappuccino', price: '₹350'}, { name: 'Caffè Latte', price: '₹280'}],
  "Barbeque Nation": [{ name: 'Assorted Grill Platter', price: '₹850'}, { name: 'Live Grill Experience', price: '₹1200'}],
  "Kyoto Sushi": [{ name: 'Dragon Roll', price: '₹750'}, { name: 'Spicy Tuna Roll', price: '₹700'}],
  "KFC": [{ name: 'Friend Chicken Bucket', price: '₹650'}, { name: 'Zinger Burger', price: '₹250'}],
  "Haldiram's": [{ name: 'Chole Bhature', price: '₹220'}, { name: 'Raj Kachori', price: '₹180'}],
  "Baskin Robbins": [{ name: 'Mississippi Mud', price: '₹150'}, { name: 'Chocolate Fudge', price: '₹170'}],
  "Subway": [{ name: 'Chicken Teriyaki Sub', price: '₹320'}, { name: 'Paneer Tikka Sub', price: '₹290'}],
};

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeder');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await Restaurant.deleteMany();
        await MenuItem.deleteMany();
        const createdRestaurants = await Restaurant.insertMany(restaurants);
        console.log('Restaurants Imported!');
        const allMenuItems = [];
        createdRestaurants.forEach(restaurant => {
            if (menus[restaurant.name]) {
                const restaurantMenu = menus[restaurant.name].map(item => {
                    return { ...item, description: item.description || '', restaurant: restaurant._id };
                });
                allMenuItems.push(...restaurantMenu);
            }
        });
        await MenuItem.insertMany(allMenuItems);
        console.log('Menu Items Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const run = async () => {
    await connectDB();
    await importData();
};

run();