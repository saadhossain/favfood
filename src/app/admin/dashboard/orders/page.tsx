'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch';
import AddButton from '@/app/components/shared/buttons/AddButton';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader';
import OrdersTable from '@/app/components/tables/OrdersTable';
import { useSetUserData } from '@/app/hooks/useSetUserData';
import { useAppSelector } from '@/app/lib/hooks';
import { useSession } from 'next-auth/react';


const AllOrders = () => {
  const { data: session } = useSession();
  //Get the Orders from the server
  const { userData: orders } = useAppSelector((state) => state.userData);
  // Enable Search Functionality
  const { isLoading, refetch } = useSetUserData('/orders');
  return (
    <div>
      <div className='flex gap-5 items-start justify-between'>
        <SubHeading heading={'Orders'} />
        <div className='flex flex-col gap-2 items-end'>
          <AddButton endpoint='/orders/create-order' title='Create Order' />
          <DashboardSearch />
        </div>
      </div>
      {
        (isLoading || !session) ? <TableSkeletonLoader /> : <OrdersTable orders={orders} refetch={refetch} />
      }
    </div>
  )
}

export default AllOrders