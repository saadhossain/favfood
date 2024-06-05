'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import ReviewsTable from '@/app/components/tables/ReviewsTable'
import { useGetAdminDataQuery } from '@/app/lib/features/api/apiSlice'
import { useSession } from 'next-auth/react'

const Reviews = () => {
  const { data: session } = useSession();
  //Get the reviews from the server
  const { isLoading, data } = useGetAdminDataQuery('/reviews')
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Reviews'} />
        <DashboardSearch />
      </div>
      {
        (isLoading || !session) ? <TableSkeletonLoader /> : <ReviewsTable reviews={data?.result} />
      }
    </div>
  )
}

export default Reviews