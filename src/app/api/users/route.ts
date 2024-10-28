import { mongoUrl } from '@/app/lib/db';
import { Users } from '@/app/lib/models/usersModel';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
    await mongoose.connect(mongoUrl);
    const result = await Users.find();
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
    if (payload.password) {
        const makehash = await bcrypt.hash(payload.password, 10);
        hashPassword = makehash;
    }
    //Update the user
    const result = await Users.updateOne({ _id: userId }, { $set: { ...payload, password: hashPassword } });
    return NextResponse.json({ status: true, result });
}

export const DELETE = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    await mongoose.connect(mongoUrl);
    const result = await Users.deleteOne({ _id: userId });
    return NextResponse.json({ status: true, result });
}