import { createSlice } from '@reduxjs/toolkit';

export interface ProdType {
    _id: string;
    quantity: number;
}

export interface InitialStateType {
    productsInCart: ProdType[];
}

const getCartFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }
    return [];
}

const initialState: InitialStateType = {
    productsInCart: getCartFromLocalStorage()
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
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

export const { addToCart, setCartProducts } = cartSlice.actions;
export default cartSlice.reducer;