import { createSlice } from '@reduxjs/toolkit';

export interface ProdType {
    productId: string;
}
export interface initialState {
    wishlistCount: number,
    wishlistProducts: ProdType[];
}
const getWishlistLength = () => {
    if (typeof window !== "undefined") {
        const wishlist = localStorage.getItem('favFoodWishlist');
        return wishlist ? JSON.parse(wishlist).length : 0;
    }
    return 0
}

const initialState: initialState = {
    wishlistCount: getWishlistLength(),
    wishlistProducts: []
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlistCount: (state, action) => {
            state.wishlistCount = action.payload;
        },
        setWishlistProducts: (state, action) => {
            state.wishlistProducts = action.payload;
        }
    }
})

export const { setWishlistCount, setWishlistProducts } = wishlistSlice.actions;
export default wishlistSlice.reducer;