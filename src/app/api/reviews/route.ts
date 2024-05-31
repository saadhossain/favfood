import { mongoUrl } from '@/app/lib/db';
import { reviewSchema } from '@/app/lib/models/reviewsModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';


export const POST = async (request: Request) => {
    const payload = await request.json();
    await mongoose.connect(mongoUrl);
    const isExist = await reviewSchema.findOne({ foodId: payload.foodId, userId: payload.userId });
    if (isExist) {
        return NextResponse.json({ status: false, message: 'You have already wrote review for this.' });
    }
    const reviews = new reviewSchema(payload);
    const result = await reviews.save();
    return NextResponse.json({ status: true, result });
}
export const GET = async () => {
    await mongoose.connect(mongoUrl);
    const result = await reviewSchema.find();
    return NextResponse.json({ status: true, result });
};

export const DELETE = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await mongoose.connect(mongoUrl);
    const result = await reviewSchema.deleteOne({ _id: id });
    return NextResponse.json({ status: true, result });
}