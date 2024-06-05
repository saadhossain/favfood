'use client'
import ProductLoader from '@/app/components/spinner/ProductLoader';
import FoodCard from '@/app/components/ui/homecomp/FoodCard';
import { DataContext } from '@/app/context/DataContext';
import { useGetDataQuery } from '@/app/lib/features/api/apiSlice';
import { DataContextType } from '@/app/types/DataContextTypes';
import { FoodData } from '@/app/types/DataTypes';
import { useContext } from 'react';
interface Props {
  params: {
    restaurantName: string
  }
}

const page = ({ params }: Props) => {
  const { loading } = useContext(DataContext) as DataContextType;
  const restaurantName = decodeURIComponent(params.restaurantName);
  const {data} = useGetDataQuery('/foods');
  const foods = data?.result;
  const restaurantFoods = foods?.filter((food: FoodData) => food.restaurant.toLocaleLowerCase() === restaurantName);
  if (loading) {
    return <ProductLoader />;
  }
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 my-5'>
      {
        restaurantFoods?.map((food: FoodData) => <FoodCard key={food._id} food={food} />)
      }
    </div>
  )
}

export default page