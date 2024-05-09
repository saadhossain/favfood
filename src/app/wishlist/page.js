'use client';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { getProductsFromLocalStorage } from '../utils/getProductsFromLocalStorage';
import { getProductsInWishlist } from '../utils/getProductsInWishlist';
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import WishlistCard from '../components/ui/wishlist/WishlistCard';
import WishlistItemsloader from '../components/spinner/WishlistItemsloader';

const Wishlist = () => {
    const { loading, setWishlistInLocalStorage } = useContext(DataContext);
    // Get products from localstorage and set them to setWishlistInLocalStorage state
    getProductsFromLocalStorage('favFoodWishlist', setWishlistInLocalStorage);

    //Get all wishlist products in the cart
    const productsInWishlist = getProductsInWishlist();
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10 md:flex gap-10 justify-between'>
            {/* Wishlist Items */}
            <div className='w-full md:w-9/12'>
                <h2 className='text-xl md:text-2xl font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>Wishlist</h2>
                {
                    (loading || !productsInWishlist) ? <WishlistItemsloader/> : <div className='bg-gray-100 rounded-md'>
                        {
                            productsInWishlist?.map((product)=> <WishlistCard key={product?._id} product={product}/>)
                        }
                    </div>
                }
                {/* <WishlistItemsloader/> */}
            </div>
        </div>
    );
};

export default Wishlist;