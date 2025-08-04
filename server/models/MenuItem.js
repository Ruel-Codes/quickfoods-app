import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String, // Storing as string like '₹550' for simplicity
    required: true,
  },
  description: {
    type: String,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Restaurant', // This creates a link to the Restaurant model
  },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;