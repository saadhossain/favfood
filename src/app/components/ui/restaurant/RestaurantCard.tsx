import { RestaurantData } from '@/app/types/DataTypes';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingBag, FaTruck } from "react-icons/fa";
import { TbRosetteDiscount } from 'react-icons/tb';
import SubHeading from '../../shared/headings/SubHeading';
import RestaurantLocation from '/public/dhaka-map.png';

export const RestaurantCard = ({ restaurant }: { restaurant: RestaurantData | any }) => {
    return (
        <div>
            <div className='flex gap-10 items-center'>
                {/* Restaurant Basic Informations */}
                <div className='w-full md:w-2/3 flex gap-5 max-h-32'>
                    <Image src={restaurant.profileImage} alt={restaurant.name} width={120} height={120} className='rounded-md' />
                    <div className='flex flex-col justify-between'>
                        {/* Food Category Available */}
                        <div className='md:flex gap-5 hidden text-primary'>
                            <p className='font-semibold'>Categories: </p>{restaurant?.foodCategory?.map((category: string) => <Link
                                href={`/foods/category/${category.toLocaleLowerCase()}`}
                                key={category}
                                className='text-gray-900 hover:text-secondary'
                            >
                                <p>{category}</p>
                            </Link>)}
                        </div>
                        <h3 className='text-3xl md:text-4xl font-semibold capitalize text-primary'>{restaurant.name}</h3>
                        <div className='flex flex-col md:flex-row gap-3 md:gap-10 font-semibold'>
                            <p className='flex gap-2 items-center'><FaTruck />{restaurant.deliveryCharge === 'free' ? 'Free Delivery' : restaurant.deliveryCharge}</p>
                            <p className='flex gap-2 items-center'><FaShoppingBag />Min Order:{restaurant.minOrderAmount}</p>
                        </div>
                    </div>
                </div>
                {/* Restaurant Location */}
                <div className='w-1/3 hidden md:block'>
                    <Image src={RestaurantLocation} alt='Restaurant Location' className='rounded-md' />
                </div>
            </div>
            {/* Food Category Available */}
            <div className='flex gap-3 md:hidden mt-5'>
                {restaurant?.foodCategory?.map((category: string) => <Link
                    href={`/foods/category/${category.toLocaleLowerCase()}`}
                    key={category}
                    className='text-gray-900 hover:text-secondary'
                >
                    <p>{category}</p>
                </Link>)}
            </div>
            {/* Restaurant Offers */}
            <div className='mt-5 md:mt-6'>
                <SubHeading heading={'Available deals'} />
                <div className='w-full flex flex-col md:flex-row gap-5 text-black'>
                    {
                        restaurant?.offers?.map((offer: any) => <div
                            key={offer.name}
                            className='max-w-80 bg-[#ffe5dd] hover:bg-[#ffae95] duration-300 ease-in-out p-2 md:p-5 rounded-md cursor-pointer'
                        >
                            <div className='flex gap-2 items-center font-semibold text-lg'>
                                <TbRosetteDiscount className='w-6 h-6' />
                                <h3>{offer.name}</h3>
                            </div>
                            <p>{offer.description}</p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}
