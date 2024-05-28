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
import Link from 'next/link'
import { useContext, useEffect } from 'react'

const Restaurants = () => {
  const { data: session } = useSession();
  const { loading, adminData, setAdminData, setLoading, setInitialData } = useContext(DataContext) as DataContextType;

  useEffect(() => {
    // Fetch the initial data and set it
    fetchDataForAdmin('/api/restaurants', setLoading, setAdminData, setInitialData);
  }, [setLoading, setAdminData]);
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Restaurants'} />
        <div className='flex flex-col gap-2 items-end'>
          <DashboardSearch />
          <AddButton endpoint='add-restaurant'/>
        </div>
      </div>
      {
        (loading || !session) ? <TableSkeletonLoader /> : <RestaurantsTable restaurants={adminData} />
      }
    </div>
  )
}

export default Restaurants