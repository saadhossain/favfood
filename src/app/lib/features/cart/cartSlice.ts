import { createSlice } from '@reduxjs/toolkit';

export interface initialState {
    cartCount: number;
}

const getCartLength = () => {
    const cart = localStorage.getItem('favFoodCart');
    return cart ? JSON.parse(cart).length : 0;
}

const initialState: initialState = {
    cartCount: getCartLength(),
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartCount: (state, action) => {
            state.cartCount = action.payload;
        }
    }
})

export const { setCartCount } = cartSlice.actions;
export default cartSlice.reducer;