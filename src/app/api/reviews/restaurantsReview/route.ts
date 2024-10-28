import { mongoUrl } from '@/app/lib/db';
import { Reviews } from '@/app/lib/models/reviewsModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    await mongoose.connect(mongoUrl);
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const restaurantId = searchParams.get('id');
    //Find the right product by filtering with restaurantId
    const result = await Reviews.find({ restaurantId: restaurantId });
    return NextResponse.json({ status: true, result });
};