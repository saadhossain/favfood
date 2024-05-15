'use client';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';
import { CartDataType } from '../types/DataTypes';

export const useHandleAddToCart = () => {
    const { setCartQuantity } = useContext(DataContext) as DataContextType;
    const handleAddToCart = (foodId: string) => {
        // Retrieve existing cart items from local storage
        let productsInCart = JSON.parse(localStorage.getItem('favFoodCart') as any) || [];
        // Check if the product already exists in the cart
        const existingItemIndex = productsInCart.findIndex((item: CartDataType) => item.productId === foodId);

        if (existingItemIndex !== -1) {
            // If the product exists, increment its quantity by 1
            productsInCart[existingItemIndex].quantity += 1;
        } else {
            // If the product doesn't exist, add it to the cart with quantity 1
            productsInCart.push({ productId: foodId, quantity: 1 });
        }
        // Save the updated cart back to local storage
        localStorage.setItem('favFoodCart', JSON.stringify(productsInCart));
        setCartQuantity(productsInCart.length);
        toast.success('Food added to Cart.');
    };
    return handleAddToCart;
};