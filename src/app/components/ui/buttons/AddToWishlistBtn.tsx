'use client'
import { addToWishlist } from '@/app/lib/features/wishlistSlice';
import { useAppDispatch } from '@/app/lib/hooks';
import { FoodData } from '@/app/types/DataTypes';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';


const AddToWishlistBtn = ({ product, children }: { product: FoodData, children: ReactNode }) => {
    const dispatch = useAppDispatch();

    //Functionality to add product to wishlist
    const handleAddToWishlist = (prod: FoodData) => {
        const prodInfo = {
            _id: prod._id,
            name: prod.name,
            slug: prod.slug,
            restaurant: prod.restaurant,
            price: prod.price,
            image: prod.image
        };
        dispatch(addToWishlist({ ...prodInfo, quantity: 1 }))
        toast.success('Food added to Wishlist.');
    }
    return (
        <button
            onClick={() => handleAddToWishlist(product)}
        >
            {children}
        </button>
    )
}

export default AddToWishlistBtn

