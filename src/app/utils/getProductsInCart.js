'use client';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { fetchFoodData } from './fetchFoodData';
//Get the matched products in the localStorage
export const getProductsInCart = ()=>{
    const foods = fetchFoodData('all-food');
    const {productsInLocalStorage} = useContext(DataContext);
    // console.log(foods);
    return productsInLocalStorage?.map(item => {
        const foundProduct = foods.find(food => food._id === item.productId);
        return {
            product: foundProduct,
            quantity: item.quantity
        };
    })
};