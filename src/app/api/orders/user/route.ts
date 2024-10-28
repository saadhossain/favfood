import { mongoUrl } from '@/app/lib/db';
import { Orders } from '@/app/lib/models/ordersModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const queryParams = searchParams.get('userId');

    //Connect MongoDB Database
    await mongoose.connect(mongoUrl);
    //Find and return the matched orders
    const result = await Orders.find({ 'userInfo._id': queryParams });
    return NextResponse.json({ status: true, result });
}