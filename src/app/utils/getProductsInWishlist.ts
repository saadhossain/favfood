'use client';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { useGetDataQuery } from '../lib/features/api/apiSlice';
import { DataContextType } from '../types/DataContextTypes';
import { CartDataType, FoodData } from '../types/DataTypes';
//Get the matched products in the localStorage
export const getProductsInWishlist = () => {
    const { data:foods } = useGetDataQuery('/foods');
    const { wishlistProducts } = useContext(DataContext) as DataContextType;
    return wishlistProducts?.map((item: CartDataType) => {
        const foundProduct = foods?.find((food: FoodData) => food._id === item.productId);
        return foundProduct;
    })
};