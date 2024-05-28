'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading';
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader';
import OrdersTable from '@/app/components/tables/OrdersTable';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';


const AllOrders = () => {
  const { loading } = useContext(DataContext) as DataContextType;
  const { data: session } = useSession();
  const orders = fetchDataForAdmin('/api/orders');
  // console.log(orders);
  return (
    <div>
      <SubHeading heading={'All Orders'} />
      {
        (loading || !session) ? <TableSkeletonLoader /> : <OrdersTable userOrders={orders} />
      }
    </div>
  )
}

export default AllOrders