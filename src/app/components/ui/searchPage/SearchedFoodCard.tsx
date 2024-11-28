import { FoodData } from '@/app/types/DataTypes';
import Image from 'next/image';
import Link from 'next/link';
import { FaShop } from 'react-icons/fa6';
import AddToCartBtn from '../buttons/AddToCartBtn';

const SearchedFoodCard = ({ food }: { food: FoodData }) => {
    return (
        <div className='bg-gray-200 p-2 rounded-md md:flex gap-2 items-center'>
            <div className='w-full md:w-1/4'>
                <Link href={`/foods/${food.restaurant.toLowerCase()}/${food.slug}`}>
                    <Image src={food.image} alt={food.name} width={100} height={80} className='rounded-md w-full h-20' />
                </Link>
            </div>
            <div className='w-full md:w-3/4'>
                <Link href={`/foods/${food.restaurant.toLowerCase()}/${food.slug}`}>
                    <h5 className='text-md font-semibold hover:text-secondary'>{food.name}</h5>
                </Link>
                <Link href={`/restaurants/${food.restaurant.toLowerCase()}`} className='flex gap-2 items-center font-semibold text-gray-600 hover:text-secondary'><FaShop />{food.restaurant}</Link>
                <div className='flex items-center justify-between'>
                    <p className='font-semibold text-primary'>${food.price}</p>
                    <AddToCartBtn prodId={food._id} />
                </div>
            </div>
        </div>
    )
}

export default SearchedFoodCard