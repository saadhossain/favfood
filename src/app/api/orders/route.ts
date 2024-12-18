import { mongoUrl } from '@/app/lib/db';
import { Orders } from '@/app/lib/models/ordersModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
    await mongoose.connect(mongoUrl);
    const result = await Orders.find();
    return NextResponse.json({ status: true, result });
}

export const POST = async (request: NextRequest) => {
    const orderData = await request.json();
    await mongoose.connect(mongoUrl);
    const order = new Orders(orderData);
    const result = await order.save();
    return NextResponse.json({ status: true, result });
}

export const DELETE = async (request: NextRequest) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const orderId = searchParams.get('orderId');

    //Connect MongoDB Database
    await mongoose.connect(mongoUrl);
    //Find and return the matched orders
    const result = await Orders.deleteOne({ _id: orderId });
    return NextResponse.json({ status: true, result });
}

export const PATCH = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const payload = await request.json();
    //Connect to database
    await mongoose.connect(mongoUrl);
    //Update the Restaurant
    const result = await Orders.updateOne({ _id: id }, { $set: payload });
    return NextResponse.json({ status: true, result });
}
