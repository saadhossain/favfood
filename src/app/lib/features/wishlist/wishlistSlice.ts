import { createSlice } from '@reduxjs/toolkit';

export interface initialState {
    wishlistCount: number
}
const getWishlistLength = () => {
    const wishlist = localStorage.getItem('favFoodWishlist');
    return wishlist ? JSON.parse(wishlist).length : 0;
}

const initialState: initialState = {
    wishlistCount: getWishlistLength(),
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlistCount: (state, action) => {
            state.wishlistCount = action.payload;
        }
    }
})

export const { setWishlistCount } = wishlistSlice.actions;
export default wishlistSlice.reducer;