'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading';
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader';
import UsersTable from '@/app/components/ui/admin/UsersTable';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

const Users = () => {
  const { loading } = useContext(DataContext) as DataContextType;
  const { data: session } = useSession();
  const users = fetchDataForAdmin('/api/users');
  return (
    <div>
      <SubHeading heading={'Users'} />
      {
        (loading || !session) ? <TableSkeletonLoader /> : <UsersTable users={users}/>
      }
    </div>
  )
}

export default Users