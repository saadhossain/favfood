'use client'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import FoodsTable from '@/app/components/tables/FoodsTable'
import { useSetUserData } from '@/app/hooks/useSetUserData'
import { useAppSelector } from '@/app/lib/hooks'
import { useSession } from 'next-auth/react'


const FoodLists = () => {
    const { data: session } = useSession();
    //Get the foods from the server
    const { userData: foods } = useAppSelector((state) => state.userData);
    // Enable Search Functionality
    const { isLoading, refetch } = useSetUserData('/foods');
    return (
        <div>
            {
                (isLoading || !session) ? <TableSkeletonLoader /> : <FoodsTable foods={foods} refetch={refetch} />
            }
        </div>
    )
}

export default FoodLists