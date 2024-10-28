import { mongoUrl } from '@/app/lib/db';
import { Restaurants } from '@/app/lib/models/restaurantModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    await mongoose.connect(mongoUrl);
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const restaurantName = searchParams.get('name');
    //Find the right product by filtering with restaurant and slug
    const result = await Restaurants.find({
        name: { $regex: restaurantName, $options: 'i' }
    });
    return NextResponse.json({ status: true, result });
};