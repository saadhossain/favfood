import { mongoUrl } from '@/app/lib/db';
import { Foods } from '@/app/lib/models/foodsModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

type QueryType = {
    discountPercentage?: { $gt: number };
    itemSold?: { $gt: number };
    reviewCount?: { $gt: number };
};

export const GET = async (request: NextRequest) => {
    await mongoose.connect(mongoUrl);

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const queryParams = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '0');

    const query: QueryType = {};

    if (queryParams === 'promotions') {
        query.discountPercentage = { $gt: 5 };
    } else if (queryParams === 'best-seller') {
        query.itemSold = { $gt: 100 };
    } else if (queryParams === 'top-rated') {
        query.reviewCount = { $gt: 100 };
    }

    const result = await Foods.find(query)
        .sort({ [queryParams === 'best-seller' ? 'itemSold' : queryParams === 'top-rated' ? 'reviewCount' : '_id']: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return NextResponse.json({ status: true, result });
};

export const POST = async (request: NextRequest) => {
    await mongoose.connect(mongoUrl);
    const payload = await request.json();
    const slug = payload?.foodName?.toLowerCase().replace(/[&/:]+|\s+/g, '-').replace(/--+/g, '-');
    const food = new Foods({ ...payload, slug, createdAt: new Date() });
    const result = await food.save();
    return NextResponse.json({ status: true, result });
};

export const PATCH = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const payload = await request.json();
    //Connect to database
    await mongoose.connect(mongoUrl);
    //Update the Food
    const result = await Foods.updateOne({ _id: id }, { $set: payload });
    return NextResponse.json({ status: true, result });
}


export const DELETE = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const foodId = searchParams.get('foodId');
    await mongoose.connect(mongoUrl);
    const result = await Foods.deleteOne({ _id: foodId });
    return NextResponse.json({ status: true, result });
}

// export const DELETE = async () => {
//     await mongoose.connect(mongoUrl);
//     return;
//     const result = await Foods.deleteMany();
//     return NextResponse.json({ status: true, result });
// }