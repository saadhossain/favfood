'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import ReviewsTable from '@/app/components/tables/ReviewsTable'
import { DataContext } from '@/app/context/DataContext'
import { DataContextType } from '@/app/types/DataContextTypes'
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'

const Reviews = () => {
  const { data: session } = useSession();
  const { loading } = useContext(DataContext) as DataContextType;
  const reviews = fetchDataForAdmin('/api/reviews');
  return (
    <div>
      <SubHeading heading={'Reviews'} />
      {
        (loading || !session) ? <TableSkeletonLoader /> : <ReviewsTable reviews={reviews} />
      }
    </div>
  )
}

export default Reviews