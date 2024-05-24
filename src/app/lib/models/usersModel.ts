import mongoose from 'mongoose';

const usersModel = new mongoose.Schema({
    email: String,
    fullName: String,
    password: String,
    profileImg: String,
    role: String,
    isActive: Boolean,
    phone: String,
    address: {
        streetAddress: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    }
})

export const userSchema = mongoose.models.users || mongoose.model('users', usersModel);