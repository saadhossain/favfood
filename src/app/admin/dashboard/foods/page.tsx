'use client'
import DashboardSearch from '@/app/components/common/DashboardSearch'
import AddButton from '@/app/components/shared/buttons/AddButton'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import FoodsTable from '@/app/components/tables/FoodsTable'
import { useSetAdminData } from '@/app/hooks/useSetAdminData'
import { useAppSelector } from '@/app/lib/hooks'
import { useSession } from 'next-auth/react'

const Foods = () => {
  const { data: session } = useSession();
  //Get the foods from the server
  const { adminData:foods } = useAppSelector((state) => state.adminData);
  // Enable Search Functionality
  const { isLoading, refetch } = useSetAdminData('/foods');
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
        (isLoading || !session) ? <TableSkeletonLoader /> : <FoodsTable foods={foods} refetch={refetch} />
      }
    </div>
  )
}

export default Foods