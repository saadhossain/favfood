'use client';
import { useGetDataQuery } from '../lib/features/api/apiSlice';
import { useAppSelector } from '../lib/hooks';
import { CartDataType, FoodData } from '../types/DataTypes';
//Get the matched products in the localStorage
export const getProductsInWishlist = () => {
    const { data: foods } = useGetDataQuery('/foods');
    const { wishlistProducts } = useAppSelector((state) => state.wishlist);
    return wishlistProducts?.map((item: CartDataType) => {
        const foundProduct = foods?.find((food: FoodData) => food._id === item.productId);
        return foundProduct;
    })
};