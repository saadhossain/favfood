'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch'
import AddButton from '@/app/components/shared/buttons/AddButton'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import RestaurantsTable from '@/app/components/tables/RestaurantsTable'
import { useSetAdminData } from '@/app/hooks/useSetAdminData'
import { useAppSelector } from '@/app/lib/hooks'
import { useSession } from 'next-auth/react'

const Restaurants = () => {
  const { data: session } = useSession();
  //Get the Restaurants from the server
  const { adminData } = useAppSelector((state) => state.adminData);
  // Enable Search Functionality
  const { isLoading, refetch } = useSetAdminData('/restaurants');
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Restaurants'} />
        <div className='flex flex-col gap-2 items-end'>
          <AddButton endpoint='/restaurants/add-restaurant' title='Add Restaurant' />
          <DashboardSearch />
        </div>
      </div>
      {
        (isLoading || !session) ? <TableSkeletonLoader /> : <RestaurantsTable restaurants={adminData} refetch={refetch} />
      }
    </div>
  )
}

export default Restaurants