'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import FoodsTable from '@/app/components/tables/FoodsTable'
import RestaurantsTable from '@/app/components/tables/RestaurantsTable'
import { DataContext } from '@/app/context/DataContext'
import { DataContextType } from '@/app/types/DataContextTypes'
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'

const Restaurants = () => {
  const { data: session } = useSession();
  const { loading } = useContext(DataContext) as DataContextType;
  const restaurants = fetchDataForAdmin('/api/restaurants');
  return (
    <div>
      <SubHeading heading={'Restaurants'} />
      {
        (loading || !session) ? <TableSkeletonLoader /> : <RestaurantsTable restaurants={restaurants} />
      }
    </div>
  )
}

export default Restaurants