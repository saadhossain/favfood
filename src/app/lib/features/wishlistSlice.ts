import { CartProdType } from '@/app/types/DataTypes';
import { createSlice } from '@reduxjs/toolkit';

export interface InitialStateType {
    productsInWishlist: CartProdType[];
}

const getWishlistFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const cart = localStorage.getItem('wishlist');
        return cart ? JSON.parse(cart) : [];
    }
    return [];
}

const initialState: InitialStateType = {
    productsInWishlist: getWishlistFromLocalStorage()
}
export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            state.productsInWishlist.push({ ...action.payload });
        },
        removeFromWishlist: (state, action) => {
            const productsAfterRemove = state.productsInWishlist.filter((prod: CartProdType) => prod._id !== action.payload);
            state.productsInWishlist = productsAfterRemove;
        }
    }
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;