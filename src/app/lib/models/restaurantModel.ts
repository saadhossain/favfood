import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    name: String,
    foodCategory: [],
    minOrderAmount: String,
    location: String,
    deliveryCharge: String,
    profileImage: String,
    offers: [],
    isActive: Boolean
})

export const Restaurants = mongoose.models.restaurants || mongoose.model('restaurants', restaurantSchema);