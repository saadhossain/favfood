import { useHandleAddToCart } from '@/app/hooks/useHandleAddToCart';
import { FoodData } from '@/app/types/DataTypes';
import Image from 'next/image';
import Link from 'next/link';
import { FaCartShopping, FaShop } from 'react-icons/fa6';

const SearchedFoodCard = ({ food }: { food: FoodData }) => {
    const handleAddToCart = useHandleAddToCart();
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
                    <>
                        {/* Cart button for pc */}
                        <button
                            onClick={() => handleAddToCart(food._id)}
                            className='hidden md:flex gap-1 items-center justify-center p-2 rounded-md bg-primary text-white hover:bg-secondary duration-200 ease-in-out'><FaCartShopping />Get</button>
                        {/* Cart button for mobile */}
                        <FaCartShopping
                            onClick={() => handleAddToCart(food._id)}
                            className='text-primary hover:text-secondary duration-200 ease-in-out md:hidden'
                        />
                    </>
                </div>
            </div>
        </div>
    )
}

export default SearchedFoodCard