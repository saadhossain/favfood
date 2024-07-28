'use client';
import { useSetUserData } from '@/app/hooks/useSetUserData';
import { useAppSelector } from '@/app/lib/hooks';
import { Metadata } from 'next';
import { useSession } from 'next-auth/react';
import TableSkeletonLoader from '../../spinner/TableSkeletonLoader';
import OrdersTable from '../../tables/OrdersTable';


const DisplayOrders = () => {
    const { data: session } = useSession();
    //Get the Orders from the server
    const { userData: orders } = useAppSelector((state) => state.userData);
    // Enable Search Functionality
    const { isLoading, refetch } = useSetUserData(`/orders/user/?userId=${session?.user._id}`);
    return (
        <div>
            {
                (isLoading || !session) ? <TableSkeletonLoader /> : <OrdersTable orders={orders} refetch={refetch} />
            }
        </div>
    )
}

export default DisplayOrders