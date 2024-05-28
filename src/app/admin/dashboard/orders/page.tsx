'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader';
import OrdersTable from '@/app/components/tables/OrdersTable';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin';
import { useSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';


const AllOrders = () => {
  const { data: session } = useSession();
  const { loading, adminData, setAdminData, setLoading, setInitialData } = useContext(DataContext) as DataContextType;

  useEffect(() => {
    // Fetch the initial data and set it
    fetchDataForAdmin('/api/orders', setLoading, setAdminData, setInitialData);
  }, [setLoading, setAdminData]);
  return (
    <div>
      <div className='flex items-center justify-between'>
        <SubHeading heading={'All Orders'} />
        <DashboardSearch />
      </div>
      {
        (loading || !session) ? <TableSkeletonLoader /> : <OrdersTable userOrders={adminData} />
      }
    </div>
  )
}

export default AllOrders