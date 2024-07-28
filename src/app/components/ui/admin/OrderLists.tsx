'use client'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader';
import OrdersTable from '@/app/components/tables/OrdersTable';
import { useSetUserData } from '@/app/hooks/useSetUserData';
import { useAppSelector } from '@/app/lib/hooks';
import { useSession } from 'next-auth/react';


const OrderLists = () => {
    const { data: session } = useSession();
    //Get the Orders from the server
    const { userData: orders } = useAppSelector((state) => state.userData);
    // Enable Search Functionality
    const { isLoading, refetch } = useSetUserData('/orders');
    return (
        <div>
            {
                (isLoading || !session) ? <TableSkeletonLoader /> : <OrdersTable orders={orders} refetch={refetch} />
            }
        </div>
    )
}

export default OrderLists