'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import ReviewsTable from '@/app/components/tables/ReviewsTable'
import { useSetAdminData } from '@/app/hooks/useSetAdminData'
import { useGetAdminDataQuery } from '@/app/lib/features/api/apiSlice'
import { useAppSelector } from '@/app/lib/hooks'
import { useSession } from 'next-auth/react'

const Reviews = () => {
  const { data: session } = useSession();
 //Get the Reviews from the server
 const { adminData } = useAppSelector((state) => state.adminData);
 // Enable Search Functionality
 const { isLoading, refetch } = useSetAdminData('/reviews');
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Reviews'} />
        <DashboardSearch />
      </div>
      {
        (isLoading || !session) ? <TableSkeletonLoader /> : <ReviewsTable reviews={adminData} refetch={refetch}/>
      }
    </div>
  )
}

export default Reviews