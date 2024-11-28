import { CartProdType } from '@/app/types/DataTypes';
import { createSlice } from '@reduxjs/toolkit';

export interface InitialStateType {
    productsInCart: CartProdType[];
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
            const existingProduct = state.productsInCart.find((prod: CartProdType) => prod._id === action.payload._id);
            if (existingProduct) {
                existingProduct.quantity++
            }
            state.productsInCart.push({ ...action.payload });
        },
        incrementQuantity: (state, action) => {
            const productInCart = state.productsInCart.find((prod: CartProdType) => prod._id === action.payload);
            if (productInCart) {
                productInCart.quantity++;
            }
        },
        decrementQuantity: (state, action) => {
            const productInCart = state.productsInCart.find((prod: CartProdType) => prod._id === action.payload);
            if (productInCart && productInCart.quantity > 1) {
                productInCart.quantity--;
            }
        },
        removeFromCart: (state, action) => {
            const productsAfterRemove = state.productsInCart.filter((prod: CartProdType) => prod._id !== action.payload);
            state.productsInCart = productsAfterRemove;
        },
        incrementQuantityByNumber: (state, action) => {
            const productInCart = state.productsInCart.find((prod: CartProdType) => prod._id === action.payload.id);
            if (productInCart?.quantity) {
                productInCart.quantity = action.payload.quantity;
            }
        }
    }
})

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, incrementQuantityByNumber } = cartSlice.actions;
export default cartSlice.reducer;