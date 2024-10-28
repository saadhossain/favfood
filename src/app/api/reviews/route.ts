import { mongoUrl } from '@/app/lib/db';
import { Reviews } from '@/app/lib/models/reviewsModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';


export const POST = async (request: Request) => {
    const payload = await request.json();
    await mongoose.connect(mongoUrl);
    const isExist = await Reviews.findOne({ foodId: payload.foodId, userId: payload.userId });
    if (isExist) {
        return NextResponse.json({ status: false, message: 'You have already wrote review for this.' });
    }
    const reviews = new Reviews(payload);
    const result = await reviews.save();
    return NextResponse.json({ status: true, result });
}
export const GET = async () => {
    await mongoose.connect(mongoUrl);
    const result = await Reviews.find();
    return NextResponse.json({ status: true, result });
};

export const DELETE = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await mongoose.connect(mongoUrl);
    const result = await Reviews.deleteOne({ _id: id });
    return NextResponse.json({ status: true, result });
}

//Edit Review details
export const PATCH = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    const payload = await request.json();
    //Connect to database
    await mongoose.connect(mongoUrl);

    //Update the user
    const result = await Reviews.updateOne({ _id: userId }, { $set: payload });
    return NextResponse.json({ status: true, result });
}