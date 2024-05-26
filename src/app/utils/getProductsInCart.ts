'use client';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';
import { CartDataType, FoodData } from '../types/DataTypes';
import { fetchFoodData } from './fetchFoodData';
//Get the matched products in the localStorage
export const getProductsInCart = () => {
    const foods = fetchFoodData();
    const { cartProducts } = useContext(DataContext) as DataContextType;
    return cartProducts?.map((item: CartDataType) => {
        const foundProduct = foods.find((food: FoodData) => food._id === item.productId);
        return {
            product: foundProduct,
            quantity: item.quantity
        };
    })
};