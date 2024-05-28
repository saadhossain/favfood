'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import FoodsTable from '@/app/components/tables/FoodsTable'
import { DataContext } from '@/app/context/DataContext'
import { DataContextType } from '@/app/types/DataContextTypes'
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin'
import { useSession } from 'next-auth/react'
import { useContext, useEffect } from 'react'

const Foods = () => {
  const { data: session } = useSession();
  const { loading, adminData, setAdminData, setLoading, setInitialData } = useContext(DataContext) as DataContextType;

  useEffect(() => {
    // Fetch the initial data and set it
    fetchDataForAdmin('/api/foods', setLoading, setAdminData, setInitialData);
  }, [setLoading, setAdminData]);
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Foods'} />
        <DashboardSearch />
      </div>
      {
        (loading || !session) ? <TableSkeletonLoader /> : <FoodsTable foods={adminData} />
      }
    </div>
  )
}

export default Foods