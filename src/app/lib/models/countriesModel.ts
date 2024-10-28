import mongoose from 'mongoose';

const countriesSchema = new mongoose.Schema({
    name: String
})

export const Countries = mongoose.models.countries || mongoose.model('countries', countriesSchema);