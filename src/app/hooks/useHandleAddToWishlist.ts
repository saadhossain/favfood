'use client';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import toast from 'react-hot-toast';
import { DataContextType } from '../types/DataContextTypes';
import { WishlistData } from '../types/DataTypes';

export const useHandleAddToWishlist = () => {
    const { setWishlistQuantity } = useContext(DataContext) as DataContextType;
    const handleAddToWishlist = (foodId:string) => {
        // Retrieve existing wishlist items from local storage
        let productsInWishlist = JSON.parse(localStorage.getItem('favFoodWishlist') as string) || [];
        // Check if the product already exists in the wishlist
        const isExists = productsInWishlist.find((item:WishlistData) => item.productId === foodId);
        if (isExists) {
           toast.error('Food already exist in Wishlist');
           return;
        }
        productsInWishlist.push({ productId: foodId});
        // Save the updated wishlist back to local storage
        localStorage.setItem('favFoodWishlist', JSON.stringify(productsInWishlist));
        setWishlistQuantity(productsInWishlist.length);
        toast.success('Food added to Wishlist.');
    };
    return handleAddToWishlist;
};