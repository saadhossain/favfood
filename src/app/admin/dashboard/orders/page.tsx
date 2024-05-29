'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch';
import AddButton from '@/app/components/shared/buttons/AddButton';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader';
import OrdersTable from '@/app/components/tables/OrdersTable';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';


const AllOrders = () => {
  const { data: session } = useSession();
  const { loading, adminData } = useContext(DataContext) as DataContextType;
  //Get the orders from the server
  fetchDataForAdmin('/api/orders');
  return (
    <div>
      <div className='flex gap-5 items-start justify-between'>
        <SubHeading heading={'Orders'} />
        <div className='flex flex-col gap-2 items-end'>
          <DashboardSearch />
          <AddButton endpoint='/orders/create-order' title='Create Order' />
        </div>
      </div>
      {
        (loading || !session) ? <TableSkeletonLoader /> : <OrdersTable userOrders={adminData} />
      }
    </div>
  )
}

export default AllOrders