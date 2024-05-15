import { Dispatch, SetStateAction } from 'react';

export interface DataContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    tabQuery: string;
    setTabQuery: Dispatch<SetStateAction<string>>;
    cartQuantity: number; 
    setCartQuantity: Dispatch<SetStateAction<number>>;
    productsInLocalStorage: any;
    setProductsInLocalStorage: any;
    wishlistQuantity: number;
    setWishlistQuantity: Dispatch<SetStateAction<number>>;
    wishlistInLocalStorage: any;
    setWishlistInLocalStorage: any;
}