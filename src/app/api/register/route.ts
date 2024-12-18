import { mongoUrl } from '@/app/lib/db';
import { Users } from '@/app/lib/models/usersModel';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

//route for saving users in database
export const POST = async (request: NextRequest) => {
    await mongoose.connect(mongoUrl);
    const payload = await request.json();
    //Find the users in the database, if exists don't overwrite
    const isExist = await Users.findOne({ email: payload.email });
    if (isExist) {
        return NextResponse.json({ status: false, message: 'User already exist, Please login to your account.' });
    }
    const hashPassword = await bcrypt.hash(payload.password, 10);
    const user = new Users({ ...payload, password: hashPassword });
    const result = await user.save();
    return NextResponse.json({ status: true, result });
};