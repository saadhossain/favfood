'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch'
import AddButton from '@/app/components/shared/buttons/AddButton'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import RestaurantsTable from '@/app/components/tables/RestaurantsTable'
import { useGetAdminDataQuery } from '@/app/lib/features/api/apiSlice'
import { useSession } from 'next-auth/react'

const Restaurants = () => {
  const { data: session } = useSession();
  //Get the restaurants from the server
  const { isLoading, data, refetch } = useGetAdminDataQuery('/restaurants')
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
        (isLoading || !session) ? <TableSkeletonLoader /> : <RestaurantsTable restaurants={data?.result} refetch={refetch}/>
      }
    </div>
  )
}

export default Restaurants