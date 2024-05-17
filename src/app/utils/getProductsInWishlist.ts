'use client';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { fetchFoodData } from './fetchFoodData';
import { DataContextType } from '../types/DataContextTypes';
import { CartDataType, FoodData } from '../types/DataTypes';
//Get the matched products in the localStorage
export const getProductsInWishlist = ()=>{
    const foods = fetchFoodData('all-food', 1);
    const {wishlistProducts} = useContext(DataContext) as DataContextType;
    // console.log(foods);
    return wishlistProducts?.map((item: CartDataType) => {
        const foundProduct = foods.find((food:FoodData) => food._id === item.productId);
        return foundProduct;
    })
};