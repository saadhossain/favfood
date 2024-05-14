import { mongoUrl } from '@/app/lib/db';
import { userSchema } from '@/app/lib/models/usersModel';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

//route for saving users in database
export const POST = async (request) => {
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