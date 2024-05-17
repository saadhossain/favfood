import { mongoUrl } from '@/app/lib/db';
import { foodSchema } from '@/app/lib/models/foodsModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    try {
        await mongoose.connect(mongoUrl);
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.searchParams);
        const searchQuery = searchParams.get('query');

        const searchWords = searchQuery?.split(' ').filter(word => word);
        const filter = {
            $or: searchWords?.map(word => ({
                $or: [
                    { name: { $regex: word, $options: 'i' } },
                    { description: { $regex: word, $options: 'i' } },
                    { restaurant_Name: { $regex: word, $options: 'i' } },
                    { category: { $regex: word, $options: 'i' } }
                ]
            }))
        };
        // Query the database with the filter
        const result = await foodSchema.find(filter);
        // Return the result as JSON
        return NextResponse.json({ status: true, result });
    } catch (error: any) {
        console.error(error?.message);
        return NextResponse.json({ status: false, message: error?.message });
    }
};