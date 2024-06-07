'use client';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader';
import OrdersTable from '@/app/components/tables/OrdersTable';
import { useGetUsersDataQuery } from '@/app/lib/features/api/apiSlice';
import { useSession } from 'next-auth/react';
const Orders = () => {
  const { data: session } = useSession();
  const { data:orders, refetch, isLoading } = useGetUsersDataQuery(`/orders/user/?userId=${session?.user._id}`);
  return (
    <div>
      <SubHeading heading={'Orders'} />
      {
        (isLoading || !session) ? <TableSkeletonLoader /> : <OrdersTable orders={orders} refetch={refetch} />
      }
    </div>
  )
}

export default Orders