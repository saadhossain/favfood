'use client';
import { useHandleAddToCart } from '@/app/hooks/useHandleAddToCart';
import { useHandleAddToWishlist } from '@/app/hooks/useHandleAddToWishlist';
import { FoodData } from '@/app/types/DataTypes';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { FaCartShopping, FaShop, FaStar } from "react-icons/fa6";
import { MdSell } from "react-icons/md";

const FoodCard = ({ food }: {food:FoodData}) => {
    const handleAddToCart = useHandleAddToCart();
    const handleAddToWishlist = useHandleAddToWishlist();
    return (
        <div className='bg-gray-100 border-gray-100 rounded-md h-56 md:h-[350px] relative'>
            <Link href={`/food/${food.restaurant_Name}/${food.slug}`}>
                <Image src={food.image} alt={food.name} width={400} height={250} className='rounded-t-md relative h-28 md:h-44' />
            </Link>
            {/* Wishlist Button */}
            <FaHeart
                onClick={() => handleAddToWishlist(food._id)}
                className='w-5 h-5 text-primary absolute top-1 left-1 cursor-pointer hover:text-secondary' />
            <Link href='/' className='flex gap-1 items-center md:hidden absolute top-1 right-1 bg-gray-100 rounded-md px-2'><FaStar className='text-primary' />{food.reviewCount}</Link>
            <div className='flex flex-col justify-between p-2 md:p-4'>
                {/* Food name and its Reviews */}
                <div className='flex items-start justify-between'>
                    <Link href={`/food/${food.restaurant_Name}/${food.slug}`}>
                        <h3 className='w-full md:w-9/12 text-sm md:text-[15px] font-semibold'>{food.name}</h3>
                    </Link>
                    <Link href='/' className='w-3/12 md:flex gap-1 items-center underline hover:text-primary hidden'><FaStar className='text-primary' />{food.reviewCount}</Link>
                </div>
                {/* Restaurant Name and Item Sold */}
                <div className='flex items-start justify-between mt-1 md:mt-2'>
                    <Link href='/' className='text-sm md:text-base font-semibold flex items-center gap-1 hover:text-secondary'><FaShop className='text-primary h-4 w-4' />{food.restaurant_Name}</Link>
                    <p className='w-3/12 md:flex gap-1 items-center hidden'><MdSell className='text-primary' />{food.itemSold}</p>
                </div>
                {/* Price and Order Button */}
                <div className='w-full flex items-end absolute bottom-2 md:bottom-3'>
                    <h5 className='font-semibold text-primary'>${food.price}</h5>
                    {/* Cart button for pc */}
                    <button
                        onClick={() => handleAddToCart(food._id)}
                        className='hidden md:flex gap-1 items-center justify-center py-2 px-5 rounded-md bg-primary text-white hover:bg-secondary duration-200 ease-in-out absolute right-7'><FaCartShopping />Order</button>
                    {/* Cart button for mobile */}
                    <button
                        onClick={() => handleAddToCart(food._id)}
                        className='md:hidden absolute right-7'><FaCartShopping className='text-primary hover:text-secondary duration-200 ease-in-out ' /></button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;