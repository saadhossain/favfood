'use client';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader';
import OrdersTable from '@/app/components/tables/OrdersTable';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { fetchUserOrders } from '@/app/utils/fetchUserOrders';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
const Orders = () => {
  const { loading } = useContext(DataContext) as DataContextType;
  const { data: session } = useSession();
  const userOrders = fetchUserOrders(session);
  return (
    <div>
      <SubHeading heading={'Orders'} />
      {
        (loading || !session) ? <TableSkeletonLoader /> : <OrdersTable userOrders={userOrders} />
      }
    </div>
  )
}

export default Orders