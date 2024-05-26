import { mongoUrl } from '@/app/lib/db';
import { countriesSchema } from '@/app/lib/models/countriesModel';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async () => {
    await mongoose.connect(mongoUrl);
    const countries = await countriesSchema.find();
    return NextResponse.json(countries);
};