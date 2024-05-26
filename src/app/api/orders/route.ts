import { mongoUrl } from '@/app/lib/db';
import { orderSchema } from '@/app/lib/models/ordersModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
    await mongoose.connect(mongoUrl);
    const orders = await orderSchema.find();
    return NextResponse.json({ status: true, orders });
}

export const POST = async (request: NextRequest) => {
    const orderData = await request.json();
    await mongoose.connect(mongoUrl);
    const order = new orderSchema(orderData);
    const result = await order.save();
    return NextResponse.json({ status: true, result });
}