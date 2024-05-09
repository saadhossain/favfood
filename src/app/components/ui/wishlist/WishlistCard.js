'use client'
import { DataContext } from '@/app/context/DataContext';
import { useHandleAddToCart } from '@/app/hooks/useHandleAddToCart';
import Image from 'next/image';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const WishlistCard = ({ product }) => {
    const {setWishlistInLocalStorage, setWishlistQuantity} = useContext(DataContext);
    const handleAddToCart = useHandleAddToCart();

    const handleRemoveProductFromWishlist = (id) => {
        // console.log(id);
        let productsInWishlist = JSON.parse(localStorage.getItem('favFoodWishlist'));
        const updatedProducts = productsInWishlist.filter(item => item.productId !== id);
        // Update local storage with the updated products
        localStorage.setItem('favFoodWishlist', JSON.stringify(updatedProducts));
        setWishlistInLocalStorage(updatedProducts);
        setWishlistQuantity(updatedProducts.length);
        toast.error('Food removed from Wishlist.')
    };
    return (
        <div className='flex items-center justify-between border-b-2 border-gray-200 py-2 px-5 text-gray-800'>
            <button
            onClick={()=> handleRemoveProductFromWishlist(product._id)}
            className='text-red-600 font-semibold text-xl'
            >X</button>
            <Image src={product.image} alt={product.name} width={60} height={40} className='rounded-md' />
            <h4>{product.name}</h4>
            <h5>${product.price}</h5>
            <div className='flex gap-1 items-center text-green-600'>
                <FaCheckCircle />
                In Stock
            </div>
            <button
                onClick={() => handleAddToCart(product?._id)}
                className='flex gap-2 items-center bg-primary text-white py-2 px-5 rounded-md my-3 hover:bg-secondary duration-300 ease-in-out'><FaCartShopping />Add to Cart</button>
        </div>
    );
};

export default WishlistCard;