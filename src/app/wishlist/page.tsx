'use client';
import Link from 'next/link';
import { useContext } from 'react';
import Heading from '../components/shared/headings/Heading';
import TableSkeletonLoader from '../components/spinner/TableSkeletonLoader';
import WishlistCard from '../components/ui/wishlist/WishlistCard';
import { DataContext } from '../context/DataContext';
import { setWishlistProducts } from '../lib/features/wishlistSlice';
import { DataContextType } from '../types/DataContextTypes';
import { FoodData } from '../types/DataTypes';
import { getDataFromLocalStorage } from '../utils/getDataFromLocalStorage';
import { getProductsInWishlist } from '../utils/getProductsInWishlist';

const Wishlist = () => {
    const { loading } = useContext(DataContext) as DataContextType;
    // Get products from localstorage and set them to setWishlistInLocalStorage state
    getDataFromLocalStorage('favFoodWishlist', setWishlistProducts);
    //Get all wishlist products in the cart
    const productsInWishlist = getProductsInWishlist();
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10 md:flex gap-10 justify-between'>
            {/* Wishlist Items */}
            <div className='w-full md:w-10/12'>
                <Heading heading={'Wishlist'} />
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
            </div>
        </div>
    );
};

export default Wishlist;