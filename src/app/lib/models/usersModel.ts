import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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

export const Users = mongoose.models.users || mongoose.model('users', userSchema);