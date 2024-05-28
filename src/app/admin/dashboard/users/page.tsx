'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch';
import AddButton from '@/app/components/shared/buttons/AddButton';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader';
import UsersTable from '@/app/components/tables/UsersTable';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin';
import { useSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';

const Users = () => {
  const { data: session } = useSession();
  const { loading, adminData, setAdminData, setLoading, setInitialData } = useContext(DataContext) as DataContextType;

  useEffect(() => {
    // Fetch the initial data and set it
    fetchDataForAdmin('/api/users', setLoading, setAdminData, setInitialData);
  }, [setLoading, setAdminData]);
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Users'} />
        <div className='flex flex-col gap-2 items-end'>
          <DashboardSearch />
          <AddButton endpoint='add-user' />
        </div>
      </div>
      {
        (loading || !session) ? <TableSkeletonLoader /> : <UsersTable users={adminData} />
      }
    </div>
  )
}

export default Users