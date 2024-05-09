'use client';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { fetchFoodData } from './fetchFoodData';
//Get the matched products in the localStorage
export const getProductsInWishlist = ()=>{
    const foods = fetchFoodData('all-food');
    const {wishlistInLocalStorage} = useContext(DataContext);
    // console.log(foods);
    return wishlistInLocalStorage?.map(item => {
        const foundProduct = foods.find(food => food._id === item.productId);
        return foundProduct;
    })
};