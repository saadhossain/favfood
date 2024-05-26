import { mongoUrl } from '@/app/lib/db';
import { userSchema } from '@/app/lib/models/usersModel';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
    await mongoose.connect(mongoUrl);
    const users = await userSchema.find();
    return NextResponse.json(users);
};
//route for saving users in database
export const POST = async (request: NextRequest) => {
    await mongoose.connect(mongoUrl);
    const payload = await request.json();
    //Find the users in the database, if exists don't overwrite
    const isExist = await userSchema.findOne({ email: payload.email });
    if (isExist) {
        return NextResponse.json({ status: false, message: 'User already exist, Please login to your account.' });
    }
    const hashPassword = await bcrypt.hash(payload.password, 10);
    const user = new userSchema({ ...payload, password: hashPassword });
    const result = await user.save();
    return NextResponse.json({ status: true, result });
};

//Edit User details
export const PATCH = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const payload = await request.json();
    //Connect to database
    await mongoose.connect(mongoUrl);
    //Check if the payload contains password, if yes, then make it hashpassword
    let hashPassword;
    if(payload.password){
       const makehash = await bcrypt.hash(payload.password, 10);
       hashPassword = makehash;
    }
    //Update the user
    const result = await userSchema.updateOne({ _id: userId }, { $set: { ...payload, password: hashPassword } });
    return NextResponse.json({ status: true, result });
}