import { mongoUrl } from '@/app/lib/db';
import { userSchema } from '@/app/lib/usersModel';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async()=>{
    await mongoose.connect(mongoUrl);
    const users = await userSchema.find();
    // console.log(users);
    return NextResponse.json(users);
}