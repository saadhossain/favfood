const mongoose = require('mongoose');

const restaurantModel = new mongoose.Schema({
    email:String,
    restaurant_name:String,
    password:String,
    profileImg:String,
    restaurant_address: {}
})

export const restaurantSchema = mongoose.models.restaurants || mongoose.model('restaurants', restaurantModel);