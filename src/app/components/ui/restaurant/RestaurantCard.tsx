import { RestaurantData } from '@/app/types/DataTypes'
import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingBag, FaTruck } from "react-icons/fa";

export const RestaurantCard = ({ restaurant }: { restaurant: RestaurantData | any }) => {
    return (
        <div className='flex gap-5'>
            <Image src={restaurant.profileImage} alt={restaurant.name} width={120} height={120} />
            <div className='flex flex-col justify-between'>
                <div className='flex gap-3 text-primary'>
                    Categories: {restaurant?.foodCategory?.map((category: string) => <Link
                        href={`/foods/category/${category.toLocaleLowerCase()}`}
                        key={category}
                        className='text-gray-900 hover:text-secondary'
                    >
                        <p>{category}</p>
                    </Link>)}
                </div>
                <h3 className='text-4xl font-semibold capitalize text-primary'>{restaurant.name}</h3>
                <div className='flex gap-10 font-semibold'>
                    <p className='flex gap-2 items-center'><FaTruck/>{restaurant.deliveryCharge === 'free' ? 'Free Delivery' : restaurant.deliveryCharge}</p>
                    <p className='flex gap-2 items-center'><FaShoppingBag/>Min Order:{restaurant.minOrderAmount}</p>
                </div>
            </div>
        </div>
    )
}
