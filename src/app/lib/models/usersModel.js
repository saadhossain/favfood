const mongoose = require('mongoose');

const usersModel = new mongoose.Schema({
    email:String,
    fullName:String,
    password:String,
    profileImg:String,
})

export const userSchema = mongoose.models.users || mongoose.model('users', usersModel);