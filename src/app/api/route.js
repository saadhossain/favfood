import { NextResponse } from 'next/server';

export const GET = async () => {
    return NextResponse.json('Server Running Successfully');
};