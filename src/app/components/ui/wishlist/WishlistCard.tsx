'use client';
import { removeFromWishlist } from '@/app/lib/features/wishlistSlice';
import { useAppDispatch } from '@/app/lib/hooks';
import { CartProdType } from '@/app/types/DataTypes';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaCheckCircle } from "react-icons/fa";
import AddToCartBtn from '../buttons/AddToCartBtn';

const WishlistCard = ({ product }: { product: CartProdType | any }) => {
    const dispatch = useAppDispatch();
    const handleRemoveWishlist = (id: string) => {
        const confirmation = window.confirm('Would you like to Remove this Product?');
        if (confirmation) {
            dispatch(removeFromWishlist(id))
            toast.success('Product Removed from Wishlist.')
        }
    }
    return (
        <div className='md:flex items-center justify-between gap-2 bg-gray-100 md:border-b-2 border-gray-200 py-2 px-2 md:px-5 text-gray-800 rounded-md md:rounded-none relative'>
            {/* default remove button for computer */}
            <button
                onClick={() => handleRemoveWishlist(product._id)}
                className='text-red-600 font-semibold text-xl hidden md:block'
            >X</button>
            {/* //Remove button for mobile */}
            <button
                onClick={() => dispatch(removeFromWishlist(product._id))}
                className='text-red-600 font-semibold text-xl absolute top-3 left-3 bg-gray-100 py-1 px-3 rounded-full md:hidden'
            >X</button>
            <Link className='w-full md:w-16' href={`/food/${product?.restaurant.toLowerCase()}/${product?.slug}`}>
                <Image src={product?.image} alt={product?.name} width={60} height={40} className='w-full md:w-16 rounded-md' />
            </Link>
            <Link className='w-full md:w-6/12 ' href={`/food/${product?.restaurant.toLowerCase()}/${product?.slug}`}>
                <h4>{product?.name}</h4>
            </Link>
            {/* Price, Stock and Action Button */}
            <div className='w-full md:w-5/12 flex gap-2 items-center'>
                <h5 className='w-3/4 md:w-2/12 font-semibold'>${product?.price}</h5>
                <div className='w-4/12 md:flex gap-1 items-center text-green-600 hidden'>
                    <FaCheckCircle />
                    In Stock
                </div>
                <AddToCartBtn product={product} />
            </div>
        </div>
    );
};

export default WishlistCard;