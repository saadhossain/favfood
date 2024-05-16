import mongoose from 'mongoose';

const ordersModel = new mongoose.Schema({
    products: [
        {
            product: {
                _id: String,
                name: String,
                slug: String,
                description: String,
                price: Number,
                restaurant_Name: String,
                image: String,
                category: String,
                reviewCount: Number,
                itemSold: Number,
                discountPercentage: Number,
                createdAt: String,
            },
            quantity: Number,
        }
    ],
    orderAmount: Number,
    userInfo: {
        _id: String,
        fullName: String,
    },
    orderDate: { type: Date, default: Date.now },
    orderStatus: String,
    paymentStatus: String
})

export const orderSchema = mongoose.models.orders || mongoose.model('orders', ordersModel);