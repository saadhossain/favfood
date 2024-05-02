const mongoose = require('mongoose');

const foodsModel = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    restaurant_Name:String,
    restaurant_Id:String,
    image:String,
    category:String,
    reviewCount:Number,
    itemSold:Number,
    discountPercentage:Number
})

export const foodSchema = mongoose.models.foods || mongoose.model('foods', foodsModel);