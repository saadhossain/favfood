'use client';
import Link from 'next/link';
import { useContext } from 'react';
import WishlistItemsloader from '../components/spinner/WishlistItemsloader';
import WishlistCard from '../components/ui/wishlist/WishlistCard';
import { DataContext } from '../context/DataContext';
import { getProductsFromLocalStorage } from '../utils/getProductsFromLocalStorage';
import { getProductsInWishlist } from '../utils/getProductsInWishlist';
import { DataContextType } from '../types/DataContextTypes';
import { FoodData } from '../types/DataTypes';

const Wishlist = () => {
    const { loading, setWishlistInLocalStorage } = useContext(DataContext) as DataContextType;
    // Get products from localstorage and set them to setWishlistInLocalStorage state
    getProductsFromLocalStorage('favFoodWishlist', setWishlistInLocalStorage);
    //Get all wishlist products in the cart
    const productsInWishlist = getProductsInWishlist();
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10 md:flex gap-10 justify-between'>
            {/* Wishlist Items */}
            <div className='w-full md:w-10/12'>
                <h2 className='text-xl md:text-2xl font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>Wishlist</h2>
                {
                    (loading || !productsInWishlist) ? <WishlistItemsloader /> : <div>
                        {
                            productsInWishlist.length <= 0 ? <h1 className='w-full text-lg font-semibold text-gray-800'>There is not Product in the Wishlist. <Link href='/' className='text-primary'>Go to Shop</Link></h1> :
                                <div className='rounded-md grid grid-cols-2 md:block gap-2 md:gap-0'>
                                    {
                                        productsInWishlist?.map((product: FoodData) => <WishlistCard key={product?._id} product={product} />)
                                    }
                                </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Wishlist;