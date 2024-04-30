import { mongoUrl } from '@/app/lib/db';
import { userSchema } from '@/app/lib/models/usersModel';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async()=>{
    await mongoose.connect(mongoUrl);
    const users = await userSchema.find();
    // console.log(users);
    return NextResponse.json(users);
}
//route for saving users in database
export const POST = async (request) => {
    await mongoose.connect(mongoUrl);
    const payload = await request.json();
    // return;
    const user = new userSchema(payload);
    const result = await user.save();
    return NextResponse.json({status:true, result});
};