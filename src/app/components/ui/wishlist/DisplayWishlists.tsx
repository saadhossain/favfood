'use client';
import { DataContext } from '@/app/context/DataContext';
import { setWishlistProducts } from '@/app/lib/features/wishlistSlice';
import { DataContextType } from '@/app/types/DataContextTypes';
import { FoodData } from '@/app/types/DataTypes';
import { getDataFromLocalStorage } from '@/app/utils/getDataFromLocalStorage';
import { getProductsInWishlist } from '@/app/utils/getProductsInWishlist';
import Link from 'next/link';
import { useContext } from 'react';
import TableSkeletonLoader from '../../spinner/TableSkeletonLoader';
import WishlistCard from './WishlistCard';


const DisplayWishlists = () => {
    const { loading } = useContext(DataContext) as DataContextType;
    // Get products from localstorage and set them to setWishlistInLocalStorage state
    getDataFromLocalStorage('favFoodWishlist', setWishlistProducts);
    //Get all wishlist products in the cart
    const productsInWishlist = getProductsInWishlist();
    return (
        <>
            {
                (loading) ? <TableSkeletonLoader /> :
                    <div className='rounded-md grid grid-cols-2 md:block gap-2 md:gap-0'>
                        {
                            productsInWishlist?.map((product: FoodData | any) => <WishlistCard key={product?._id} product={product} />)
                        }
                    </div>
            }
            {
                (productsInWishlist?.length <= 0 && !loading) && <h1 className='w-full text-lg font-semibold text-gray-800'>There is not Product in the Wishlist. <Link href='/' className='text-primary'>Go to Shop</Link></h1>
            }
        </>
    );
};

export default DisplayWishlists;