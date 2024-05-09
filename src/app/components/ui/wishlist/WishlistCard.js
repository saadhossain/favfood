'use client';
import { DataContext } from '@/app/context/DataContext';
import { useHandleAddToCart } from '@/app/hooks/useHandleAddToCart';
import Image from 'next/image';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const WishlistCard = ({ product }) => {
    const { setWishlistInLocalStorage, setWishlistQuantity } = useContext(DataContext);
    const handleAddToCart = useHandleAddToCart();

    const handleRemoveProductFromWishlist = (id) => {
        // console.log(id);
        let productsInWishlist = JSON.parse(localStorage.getItem('favFoodWishlist'));
        const updatedProducts = productsInWishlist.filter(item => item.productId !== id);
        // Update local storage with the updated products
        localStorage.setItem('favFoodWishlist', JSON.stringify(updatedProducts));
        setWishlistInLocalStorage(updatedProducts);
        setWishlistQuantity(updatedProducts.length);
        toast.error('Food removed from Wishlist.');
    };
    return (
        <div className='md:flex items-center justify-between gap-2 bg-gray-100 md:border-b-2 border-gray-200 py-2 px-2 md:px-5 text-gray-800 rounded-md md:rounded-none relative'>
            {/* default remove button for computer */}
            <button
                onClick={() => handleRemoveProductFromWishlist(product._id)}
                className='text-red-600 font-semibold text-xl hidden md:block'
            >X</button>
            {/* //Remove button for mobile */}
            <button
                onClick={() => handleRemoveProductFromWishlist(product._id)}
                className='text-red-600 font-semibold text-xl absolute top-3 left-3 bg-gray-100 py-1 px-3 rounded-full md:hidden'
            >X</button>
            <Image src={product?.image} alt={product.name} width={60} height={40} className='w-full md:w-1/12 rounded-md' />
            <h4 className='w-full md:w-6/12'>{product.name}</h4>
            {/* Price, Stock and Action Button */}
            <div className='w-full md:w-5/12 flex gap-2 items-center'>
                <h5 className='w-3/4 md:w-2/12 font-semibold'>${product.price}</h5>
                <div className='w-4/12 md:flex gap-1 items-center text-green-600 hidden'>
                    <FaCheckCircle />
                    In Stock
                </div>
                <button
                    onClick={() => handleAddToCart(product?._id)}
                    className='w-1/4 md:w-6/12 flex gap-1 items-center bg-primary text-white py-2 px-2 md:px-3 rounded-md my-3 hover:bg-secondary duration-300 ease-in-out'><FaCartShopping /><span className='hidden md:block'>Add to Cart</span></button>
            </div>
        </div>
    );
};

export default WishlistCard;