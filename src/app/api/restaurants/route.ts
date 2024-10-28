import { mongoUrl } from '@/app/lib/db';
import { Restaurants } from '@/app/lib/models/restaurantModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';


export const POST = async (request: NextRequest) => {
    await mongoose.connect(mongoUrl);
    const payload = await request.json();
    const restaurant = new Restaurants(payload);
    const result = await restaurant.save();
    return NextResponse.json({ status: true, result });
}

export const GET = async (request: NextRequest) => {
    await mongoose.connect(mongoUrl);

    const result = await Restaurants.find();
    return NextResponse.json({ status: true, result });
};

export const PATCH = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const payload = await request.json();
    //Connect to database
    await mongoose.connect(mongoUrl);
    //Update the Restaurant
    const result = await Restaurants.updateOne({ _id: id }, { $set: payload });
    return NextResponse.json({ status: true, result });
}

export const DELETE = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    //Connect to database
    await mongoose.connect(mongoUrl);
    //Delete the Restaurant
    const result = await Restaurants.deleteOne({ _id: id });
    return NextResponse.json({ status: true, result });
}