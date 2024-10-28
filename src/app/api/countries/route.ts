import { mongoUrl } from '@/app/lib/db';
import { Countries } from '@/app/lib/models/countriesModel';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async () => {
    await mongoose.connect(mongoUrl);
    const countries = await Countries.find();
    return NextResponse.json(countries);
};