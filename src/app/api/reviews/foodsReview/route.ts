import { mongoUrl } from '@/app/lib/db';
import { reviewSchema } from '@/app/lib/models/reviewsModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    await mongoose.connect(mongoUrl);
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const foodId = searchParams.get('id');
    //Find the right product by filtering with foodId
    const result = await reviewSchema.find({ foodId: foodId });
    return NextResponse.json({ status: true, result });
};