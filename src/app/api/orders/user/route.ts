import { mongoUrl } from '@/app/lib/db';
import { orderSchema } from '@/app/lib/models/ordersModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const queryParams = searchParams.get('userId');

    //Connect MongoDB Database
    await mongoose.connect(mongoUrl);
    //Find and return the matched orders
    const result = await orderSchema.find({ 'userInfo._id': queryParams });
    return NextResponse.json({ status: true, result });
}

export const DELETE = async (request: NextRequest) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const orderId = searchParams.get('orderId');

    //Connect MongoDB Database
    await mongoose.connect(mongoUrl);
    //Find and return the matched orders
    const result = await orderSchema.deleteOne({ _id: orderId });
    return NextResponse.json({ status: true, result });
}