import { mongoUrl } from '@/app/lib/db';
import { reviewSchema } from '@/app/lib/models/reviewsModel';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async () => {
    await mongoose.connect(mongoUrl);
    const reviews = await reviewSchema.find();
    return NextResponse.json(reviews);
};