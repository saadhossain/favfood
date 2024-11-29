'use client'
import ProductLoader from '@/app/components/spinner/ProductLoader';
import FoodCard from '@/app/components/ui/homecomp/FoodCard';
import { DataContext } from '@/app/context/DataContext';
import { useGetDataQuery } from '@/app/lib/features/api/apiSlice';
import { DataContextType } from '@/app/types/DataContextTypes';
import { FoodData } from '@/app/types/DataTypes';
import { useContext } from 'react';

const DisplayRestaurantInfo = ({ restaurantName }: { restaurantName: string }) => {
    const { loading } = useContext(DataContext) as DataContextType;
    const { data: foods } = useGetDataQuery('/foods');
    const restaurantFoods = foods?.filter((food: FoodData) => food?.restaurant?.toLocaleLowerCase() === restaurantName);
    if (loading) {
        return <ProductLoader />;
    }
    return (
        <>
            {
                restaurantFoods?.map((food: FoodData) => <FoodCard key={food._id} food={food} />)
            }
        </>
    )
}

export default DisplayRestaurantInfo