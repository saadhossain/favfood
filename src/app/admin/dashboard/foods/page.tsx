'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch'
import AddButton from '@/app/components/shared/buttons/AddButton'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import FoodsTable from '@/app/components/tables/FoodsTable'
import { DataContext } from '@/app/context/DataContext'
import { DataContextType } from '@/app/types/DataContextTypes'
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'

const Foods = () => {
  const { data: session } = useSession();
  const { loading, adminData } = useContext(DataContext) as DataContextType;
  //Get the foods from the server
  fetchDataForAdmin('/api/foods');
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Foods'} />
        <div className='flex flex-col gap-2 items-end'>
          <AddButton endpoint='/foods/add-food' title='Add Food' />
          <DashboardSearch />
        </div>
      </div>
      {
        (loading || !session) ? <TableSkeletonLoader /> : <FoodsTable foods={adminData} />
      }
    </div>
  )
}

export default Foods