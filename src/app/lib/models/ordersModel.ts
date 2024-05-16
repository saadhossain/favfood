// const mongoose = require('mongoose');

import mongoose from 'mongoose';

const ordersModel = new mongoose.Schema({
    products: [],
    order_amount: Number,
    userInfo: {
        _id: String,
        email: String,
        fullName: String,
        image: String,
        role:String
    },
    payment: String,
    order_date: { type: Date, default: Date.now },
    order_status: String,
})

export const orderSchema = mongoose.models.orders || mongoose.model('orders', ordersModel);