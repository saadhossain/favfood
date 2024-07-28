'use client'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader';
import UsersTable from '@/app/components/tables/UsersTable';
import { useSetUserData } from '@/app/hooks/useSetUserData';
import { useAppSelector } from '@/app/lib/hooks';
import { useSession } from 'next-auth/react';


const UserLists = () => {
    const { data: session } = useSession();
    //Get the Reviews from the server
    const { userData } = useAppSelector((state) => state.userData);
    // Enable Search Functionality
    const { isLoading, refetch } = useSetUserData('/users');
    return (
        <div>
            {
                (isLoading || !session) ? <TableSkeletonLoader /> : <UsersTable users={userData} refetch={refetch} />
            }
        </div>
    )
}

export default UserLists