'use client';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import toast from 'react-hot-toast';

export const useHandleAddToWishlist = () => {
    const { setWishlistQuantity } = useContext(DataContext);
    const handleAddToWishlist = (foodId) => {
        // Retrieve existing wishlist items from local storage
        let productsInWishlist = JSON.parse(localStorage.getItem('favFoodWishlist')) || [];
        // Check if the product already exists in the wishlist
        const isExists = productsInWishlist.find(item => item.productId === foodId);
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