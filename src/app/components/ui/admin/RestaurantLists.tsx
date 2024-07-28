'use client'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import RestaurantsTable from '@/app/components/tables/RestaurantsTable'
import { useSetUserData } from '@/app/hooks/useSetUserData'
import { useAppSelector } from '@/app/lib/hooks'
import { useSession } from 'next-auth/react'

const RestaurantLists = () => {
    const { data: session } = useSession();
    //Get the Restaurants from the server
    const { userData } = useAppSelector((state) => state.userData);
    // Enable Search Functionality
    const { isLoading, refetch } = useSetUserData('/restaurants');
    return (
        <div>
            {
                (isLoading || !session) ? <TableSkeletonLoader /> : <RestaurantsTable restaurants={userData} refetch={refetch} />
            }
        </div>
    )
}

export default RestaurantLists