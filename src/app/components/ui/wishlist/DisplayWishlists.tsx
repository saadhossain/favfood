'use client';
import { useAppSelector } from '@/app/lib/hooks';
import { CartProdType, FoodData } from '@/app/types/DataTypes';
import Link from 'next/link';
import { useState } from 'react';
import TableSkeletonLoader from '../../spinner/TableSkeletonLoader';
import WishlistCard from './WishlistCard';


const DisplayWishlists = () => {
    const [isLoading, setIsLoading] = useState(true);
    //Get all wishlist products in the cart
    const { productsInWishlist } = useAppSelector((state) => state.wishlist);

    //Set a timeout while getting wishlist data from the localstorage
    setTimeout(() => {
        setIsLoading(false);
    }, 10);
    return (
        <>
            {
                (isLoading) ? <TableSkeletonLoader /> :
                    <div className='rounded-md grid grid-cols-2 md:block gap-2 md:gap-0'>
                        {
                            productsInWishlist?.map((product: FoodData | CartProdType) => <WishlistCard key={product?._id} product={product} />)
                        }
                    </div>
            }
            {
                (productsInWishlist?.length <= 0 && !isLoading) && <h1 className='w-full text-lg font-semibold text-gray-800'>There is not Product in the Wishlist. <Link href='/' className='text-primary'>Go to Shop</Link></h1>
            }
        </>
    );
};

export default DisplayWishlists;