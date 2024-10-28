import { mongoUrl } from '@/app/lib/db';
import { Foods } from '@/app/lib/models/foodsModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    await mongoose.connect(mongoUrl);
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const searchQuery = searchParams.get('query');
    try {
        const searchWords = searchQuery?.split(' ').filter(word => word);
        const filter = {
            $or: searchWords?.map(word => ({
                $or: [
                    { name: { $regex: word, $options: 'i' } },
                    { description: { $regex: word, $options: 'i' } },
                    { restaurant: { $regex: word, $options: 'i' } },
                    { category: { $regex: word, $options: 'i' } }
                ]
            }))
        };
        // Query the database with the filter
        const result = await Foods.find(filter);
        // Return the result as JSON
        return NextResponse.json({ status: true, result });
    } catch (error: any) {
        console.error(error?.message);
        return NextResponse.json({ status: false, message: error?.message });
    }
};