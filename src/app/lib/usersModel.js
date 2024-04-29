const mongoose = require('mongoose');

const usersModel = new mongoose.Schema({
    _id: String,
    name:String,
    email:String,
    image:String,
})

export const userSchema = mongoose.models.users || mongoose.model('users', usersModel);