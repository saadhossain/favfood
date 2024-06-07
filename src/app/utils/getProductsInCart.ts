'use client';
import { useGetDataQuery } from '../lib/features/api/apiSlice';
import { useAppSelector } from '../lib/hooks';
import { CartDataType, FoodData } from '../types/DataTypes';
//Get the matched products in the localStorage
export const getProductsInCart = () => {
    const { data: foods } = useGetDataQuery('/foods');
    const { cartProducts } = useAppSelector((state) => state.cart)
    return cartProducts?.map((item: CartDataType) => {
        const foundProduct = foods?.find((food: FoodData) => food._id === item.productId);
        return {
            product: foundProduct,
            quantity: item.quantity
        };
    })
};