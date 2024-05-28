import { mongoUrl } from '@/app/lib/db';
import { foodSchema } from '@/app/lib/models/foodsModel';
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

    const queryParams = searchParams.get('tabQuery');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '0');

    const query: QueryType = {};

    if (queryParams === 'promotions') {
        query.discountPercentage = { $gt: 0 };
    } else if (queryParams === 'best-seller') {
        query.itemSold = { $gt: 100 };
    } else if (queryParams === 'top-rated') {
        query.reviewCount = { $gt: 100 };
    }

    const result = await foodSchema.find(query)
        .sort({ [queryParams === 'best-seller' ? 'itemSold' : queryParams === 'top-rated' ? 'reviewCount' : '_id']: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return NextResponse.json({ status: true, result });
};

export const POST = async (request: NextRequest) => {
    await mongoose.connect(mongoUrl);
    const payload = await request.json();
    const slug = payload?.name.toLowerCase().replace(/[&/:]+|\s+/g, '-').replace(/--+/g, '-');
    const food = new foodSchema({ ...payload, slug, createdAt: new Date() });
    const result = await food.save();
    return NextResponse.json({ status: true, result });
};


export const DELETE = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const foodId = searchParams.get('foodId');
    await mongoose.connect(mongoUrl);
    const result = await foodSchema.deleteOne({ _id: foodId });
    return NextResponse.json({ status: true, result });
}

// export const DELETE = async () => {
//     await mongoose.connect(mongoUrl);
//     return;
//     const result = await foodSchema.deleteMany();
//     return NextResponse.json({ status: true, result });
// }