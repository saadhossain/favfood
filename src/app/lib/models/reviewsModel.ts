import mongoose from 'mongoose';

const reviewsModel = new mongoose.Schema({
    title: String,
    description: String,
    rating: Number,
    foodId: String,
    foodSlug: String,
    restaurantId: String,
    restaurantName: String,
    userId: String,
    userName: String,
    userProfileImage: String,
    addedOn: { type: Date, default: Date.now }
})

export const reviewSchema = mongoose.models.reviews || mongoose.model('reviews', reviewsModel);