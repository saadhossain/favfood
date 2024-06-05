'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch';
import AddButton from '@/app/components/shared/buttons/AddButton';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader';
import UsersTable from '@/app/components/tables/UsersTable';
import { useSetAdminData } from '@/app/hooks/useSetAdminData';
import { useAppSelector } from '@/app/lib/hooks';
import { useSession } from 'next-auth/react';

const Users = () => {
  const { data: session } = useSession();
  //Get the Reviews from the server
  const { adminData } = useAppSelector((state) => state.adminData);
  // Enable Search Functionality
  const { isLoading, refetch } = useSetAdminData('/users');
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Users'} />
        <div className='flex flex-col gap-2 items-end'>
          <AddButton endpoint='/users/add-user' title='Add User' />
          <DashboardSearch />
        </div>
      </div>
      {
        (isLoading || !session) ? <TableSkeletonLoader /> : <UsersTable users={adminData} refetch={refetch} />
      }
    </div>
  )
}

export default Users