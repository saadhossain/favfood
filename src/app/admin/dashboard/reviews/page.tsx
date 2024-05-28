'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import ReviewsTable from '@/app/components/tables/ReviewsTable'
import { DataContext } from '@/app/context/DataContext'
import { DataContextType } from '@/app/types/DataContextTypes'
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin'
import { useSession } from 'next-auth/react'
import { useContext, useEffect } from 'react'

const Reviews = () => {
  const { data: session } = useSession();
  const { loading, adminData, setAdminData, setLoading, setInitialData } = useContext(DataContext) as DataContextType;

  useEffect(() => {
    // Fetch the initial data and set it
    fetchDataForAdmin('/api/reviews', setLoading, setAdminData, setInitialData);
  }, [setLoading, setAdminData]);

  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Reviews'} />
        <DashboardSearch />
      </div>
      {
        (loading || !session) ? <TableSkeletonLoader /> : <ReviewsTable reviews={adminData} />
      }
    </div>
  )
}

export default Reviews