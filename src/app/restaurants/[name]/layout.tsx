'use client'
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner';
import { RestaurantCard } from '@/app/components/ui/restaurant/RestaurantCard';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { RestaurantData } from '@/app/types/DataTypes';
import { fetchSingleRestaurantData } from '@/app/utils/fetchSingleRestaurantData';
import Link from 'next/link';
import { ReactNode, useContext } from 'react';

interface LayoutProps {
    children: ReactNode;
    params: { name: string };
}

const SingleRestaurantLayout: React.FC<LayoutProps> = ({ children, params }) => {
    const { loading } = useContext(DataContext) as DataContextType;
    const singleRestaurant: RestaurantData = fetchSingleRestaurantData(params.name);
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10'>
            <RestaurantCard restaurant={singleRestaurant} />

            {/* //Tab */}
            <div className='w-full flex items-center gap-20 text-xl font-semibold mt-3 md:mt-10'>
                <Link href={`/restaurants/${params.name}`}>Foods</Link>
                <Link href={`/restaurants/${params.name}/reviews`}>reviews</Link>
            </div>
            {children}
        </div>
    )
}

export default SingleRestaurantLayout