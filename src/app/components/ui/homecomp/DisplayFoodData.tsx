'use client'
import FoodCard from '@/app/components/ui/homecomp/FoodCard';
import { useGetDataQuery } from '@/app/lib/features/api/apiSlice';
import { FoodData } from '@/app/types/DataTypes';
import { useState } from 'react';
import ProductLoader from '../../spinner/ProductLoader';

const DisplayFoodData = ({ searchParams }: { searchParams: { category: string | undefined } }) => {
    const [page, setPage] = useState(1);
    const category = searchParams.category || 'all-food'
    //Get the foods data...
    const { data: foods, isLoading } = useGetDataQuery(`/foods?tabQuery=${category}&page=${page}&limit=12`);

    //Return a Loading Skeleton while fetching the data
    if (isLoading) {
        return <ProductLoader />;
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 my-5'>
                {
                    foods?.map((food: FoodData) => <FoodCard key={food._id} food={food} />)
                }
            </div>
            <button
                className={`bg-primary text-white hover:bg-secondary py-2 px-5 rounded-md ${!foods || foods.length <= 0 && 'hidden'}`}
                onClick={() => setPage(prevPage => prevPage + 1)}
            >
                Load More
            </button>
        </div>
    );
};

export default DisplayFoodData;