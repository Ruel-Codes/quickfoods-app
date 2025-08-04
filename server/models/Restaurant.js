import mongoose from 'mongoose';

// This is the "blueprint" or "form" for our restaurant data
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // This field must exist
  },
  cuisine: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0, // Minimum rating
    max: 5, // Maximum rating
  },
  image: {
    type: String, // URL to the image
    required: true,
  },
  // We can add more fields later, like address, menu items, etc.
}, { timestamps: true }); // timestamps adds `createdAt` and `updatedAt` fields automatically

// This creates the "machine" that uses the blueprint
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// We export the machine so we can use it in other parts of our server
export default Restaurant;