import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { mongoUrl } from '@/app/lib/db';
import { foodSchema } from '@/app/lib/models/foodsModel';

export const GET = async()=>{
    await mongoose.connect(mongoUrl);
    const foods = await foodSchema.find();
    return NextResponse.json({status:true, foods})
}

export const POST = async(request)=>{
    await mongoose.connect(mongoUrl);
    const payload = await request.json();
    const food = new foodSchema(payload);
    const result = await food.save();
    return NextResponse.json({status:true, result});
}