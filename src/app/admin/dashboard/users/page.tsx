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
import { useContext } from 'react';

const Users = () => {
  const { data: session } = useSession();
  const { loading, adminData } = useContext(DataContext) as DataContextType;
  //Get the Users from the server
  fetchDataForAdmin('/api/users');
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Users'} />
        <div className='flex flex-col gap-2 items-end'>
          <AddButton endpoint='/users/add-user' title='Add User'/>
          <DashboardSearch />
        </div>
      </div>
      {
        (loading || !session) ? <TableSkeletonLoader /> : <UsersTable users={adminData} />
      }
    </div>
  )
}

export default Users