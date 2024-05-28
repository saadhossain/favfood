'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import FoodsTable from '@/app/components/ui/admin/FoodsTable'
import { DataContext } from '@/app/context/DataContext'
import { DataContextType } from '@/app/types/DataContextTypes'
import { fetchFoodData } from '@/app/utils/fetchFoodData'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'

const Foods = () => {
  const { data: session } = useSession();
  const { loading } = useContext(DataContext) as DataContextType;
  const foods = fetchFoodData();
  console.log(foods);
  return (
    <div>
      <SubHeading heading={'All Foods'} />
      {
        (loading || !session) ? <TableSkeletonLoader /> : <FoodsTable foods={foods} />
      }
    </div>
  )
}

export default Foods