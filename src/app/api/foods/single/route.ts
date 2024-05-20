import { mongoUrl } from '@/app/lib/db';
import { foodSchema } from '@/app/lib/models/foodsModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    await mongoose.connect(mongoUrl);
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const restaurantName = searchParams.get('restaurant');
    const productSlug = searchParams.get('slug');
    //Find the right product by filtering with restaurant and slug
    const result = await foodSchema.find({
        restaurant_Name: { $regex: restaurantName, $options: 'i' } ,
        slug: productSlug
    });
    return NextResponse.json({ status: true, result });
};