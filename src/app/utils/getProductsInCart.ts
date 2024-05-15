'use client';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { fetchFoodData } from './fetchFoodData';
import { DataContextType } from '../types/DataContextTypes';
import { CartDataType, FoodData } from '../types/DataTypes';
//Get the matched products in the localStorage
export const getProductsInCart = ()=>{
    const foods = fetchFoodData('all-food');
    const {productsInLocalStorage} = useContext(DataContext) as DataContextType;
    // console.log(foods);
    return productsInLocalStorage?.map((item:CartDataType) => {
        const foundProduct = foods.find((food:FoodData) => food._id === item.productId);
        return {
            product: foundProduct,
            quantity: item.quantity
        };
    })
};