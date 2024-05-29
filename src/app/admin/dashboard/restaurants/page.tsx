'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch'
import AddButton from '@/app/components/shared/buttons/AddButton'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import RestaurantsTable from '@/app/components/tables/RestaurantsTable'
import { DataContext } from '@/app/context/DataContext'
import { DataContextType } from '@/app/types/DataContextTypes'
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'

const Restaurants = () => {
  const { data: session } = useSession();
  const { loading, adminData} = useContext(DataContext) as DataContextType;
  //Get the restaurants from the server
  fetchDataForAdmin('/api/restaurants');
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Restaurants'} />
        <div className='flex flex-col gap-2 items-end'>
          <AddButton endpoint='/restaurants/add-restaurant' title='Add Restaurant'/>
          <DashboardSearch />
        </div>
      </div>
      {
        (loading || !session) ? <TableSkeletonLoader /> : <RestaurantsTable restaurants={adminData} />
      }
    </div>
  )
}

export default Restaurants