import mongoose from 'mongoose';

const restaurantModel = new mongoose.Schema({
    name: String,
    foodCategory: [],
    minOrderAmount: String,
    location: String,
    deliveryCharge: String,
    profileImage: String,
    offers: [],
    isActive: Boolean
})

export const restaurantSchema = mongoose.models.restaurants || mongoose.model('restaurants', restaurantModel);