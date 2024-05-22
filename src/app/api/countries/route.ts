import { mongoUrl } from '@/app/lib/db';
import { countriesSchema } from '@/app/lib/models/countriesModel';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async () => {
    await mongoose.connect(mongoUrl);
    const users = await countriesSchema.find();
    // console.log(users);
    return NextResponse.json(users);
};