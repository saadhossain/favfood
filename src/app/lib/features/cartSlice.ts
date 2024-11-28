import { createSlice } from '@reduxjs/toolkit';

export interface ProdType {
    _id: string;
    quantity: number;
}

export interface InitialStateType {
    cartCount: number;
    productsInCart: ProdType[];
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
    productsInCart: []
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartCount: (state, action) => {
            state.cartCount = action.payload;
        },
        addToCart: (state, action) => {
            const existingProduct = state.productsInCart.find((prod: ProdType) => prod._id === action.payload._id);
            if (existingProduct) {
                existingProduct.quantity++
            }
            state.productsInCart.push({ ...action.payload });
        },
        setCartProducts: (state, action) => {
            state.productsInCart = action.payload;
        },
    }
})

export const { addToCart, setCartCount, setCartProducts } = cartSlice.actions;
export default cartSlice.reducer;