'use client'
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner';
import { RestaurantCard } from '@/app/components/ui/restaurant/RestaurantCard';
import { RestaurantData } from '@/app/types/DataTypes';
import { fetchSingleRestaurantData } from '@/app/utils/fetchSingleRestaurantData';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    params: { restaurantName: string };
}

const SingleRestaurantLayout: React.FC<LayoutProps> = ({ children, params }) => {
    const singleRestaurant: RestaurantData = fetchSingleRestaurantData(params.restaurantName);
    const activePath = usePathname();
    if (!singleRestaurant._id) {
        return <LoadingSpinner />
    }
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10'>
            {
                singleRestaurant._id && <div>
                    <RestaurantCard restaurant={singleRestaurant} />

                    {/* Restaurant Tab */}
                    <div className='w-full flex items-center gap-20 text-lg font-semibold mt-3 md:mt-8'>
                        <Link
                            href={`/restaurants/${params.restaurantName}`}
                            className={`border-b-4 ${!activePath.includes('reviews') ? 'border-primary' : 'border-gray-200'} hover:border-primary pb-2 px-5`}
                        >Foods</Link>
                        <Link
                            href={`/restaurants/${params.restaurantName}/reviews/${singleRestaurant._id}`}
                            className={`border-b-4 ${activePath.includes('reviews') ? 'border-primary' : 'border-gray-200'} hover:border-primary pb-2 px-5`}
                        >Reviews</Link>
                    </div>
                    <hr className='border-b-4 border-gray-200 -mt-1' />
                    {children}
                </div>
            }
        </div>
    )
}

export default SingleRestaurantLayout