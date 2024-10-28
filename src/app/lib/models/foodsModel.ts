import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    price: Number,
    restaurant: String,
    image: String,
    category: String,
    reviewCount: Number,
    itemSold: Number,
    discountPercentage: Number,
    createdAt: { type: Date, default: Date.now },
})

export const Foods = mongoose.models.foods || mongoose.model('foods', foodSchema);