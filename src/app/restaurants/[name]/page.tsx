'use client'
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner';
import ProductLoader from '@/app/components/spinner/ProductLoader';
import FoodCard from '@/app/components/ui/homecomp/FoodCard';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { FoodData } from '@/app/types/DataTypes';
import { fetchFoodData } from '@/app/utils/fetchFoodData';
import { useContext } from 'react';
interface Props {
  params: {
    name: string
  }
}

const page = ({ params }: Props) => {
  const { loading } = useContext(DataContext) as DataContextType;
  const restaurantName = params.name;
  const foods = fetchFoodData();
  const restaurantFoods = foods.filter((food: FoodData) => food.restaurant_Name.toLocaleLowerCase() === restaurantName);
  // console.log(restaurantFoods);
    if (loading) {
        return <ProductLoader />;
    }
  // console.log(foods);
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 my-5'>
      {
        restaurantFoods.map((food: FoodData) => <FoodCard key={food._id} food={food} />)
      }
    </div>
  )
}

export default page