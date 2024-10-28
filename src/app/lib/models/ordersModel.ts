import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    products: [
        {
            _id: String,
            name: String,
            slug: String,
            restaurantName: String,
            price: Number,
            image: String,
            quantity: Number
        }
    ],
    orderAmount: String,
    userInfo: { _id: String, fullName: String },
    paymentMethod: String,
    orderStatus: String,
    deliveryAddress: {
        streetAddress: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    orderDate: { type: Date, default: Date.now },
    paymentStatus: String
});

export const Orders = mongoose.models.orders || mongoose.model('orders', orderSchema);