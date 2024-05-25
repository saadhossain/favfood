import mongoose from 'mongoose';

const foodsModel = new mongoose.Schema({
    name:String,
    slug:String,
    description:String,
    price:Number,
    restaurant_Name:String,
    restaurant_Id:String,
    image:String,
    category:String,
    reviewCount:Number,
    itemSold:Number,
    discountPercentage:Number,
    createdAt: { type: Date, default: Date.now },
})

export const foodSchema = mongoose.models.foods || mongoose.model('foods', foodsModel);