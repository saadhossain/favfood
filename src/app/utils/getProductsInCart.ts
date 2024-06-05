'use client';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { useGetDataQuery } from '../lib/features/api/apiSlice';
import { DataContextType } from '../types/DataContextTypes';
import { CartDataType, FoodData } from '../types/DataTypes';
//Get the matched products in the localStorage
export const getProductsInCart = () => {
    const { data } = useGetDataQuery('/foods')
    const foods = data?.result;
    const { cartProducts } = useContext(DataContext) as DataContextType;
    return cartProducts?.map((item: CartDataType) => {
        const foundProduct = foods?.find((food: FoodData) => food._id === item.productId);
        return {
            product: foundProduct,
            quantity: item.quantity
        };
    })
};