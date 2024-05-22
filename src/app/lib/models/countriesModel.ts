import mongoose from 'mongoose';

const countriesModel = new mongoose.Schema({
    name:String
})

export const countriesSchema = mongoose.models.countries || mongoose.model('countries', countriesModel);