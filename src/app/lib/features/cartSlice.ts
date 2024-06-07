import { createSlice } from '@reduxjs/toolkit';

export interface ProdType {
    productId: string;
    quantity: number;
}

export interface InitialStateType {
    cartCount: number;
    cartProducts: ProdType[];
}

const getCartLength = () => {
    if (typeof window !== "undefined") {
        const cart = localStorage.getItem('favFoodCart');
        return cart ? JSON.parse(cart).length : 0;
    }
    return 0;
}

const initialState: InitialStateType = {
    cartCount: getCartLength(),
    cartProducts: []
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartCount: (state, action) => {
            state.cartCount = action.payload;
        },
        setCartProducts: (state, action) => {
            state.cartProducts = action.payload;
        },
    }
})

export const { setCartCount, setCartProducts } = cartSlice.actions;
export default cartSlice.reducer;