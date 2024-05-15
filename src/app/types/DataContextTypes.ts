import { Dispatch, SetStateAction } from 'react';
import { FoodData } from './DataTypes';

export interface DataContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    foods:any;
    setFoods: Dispatch<SetStateAction<any>>;
    singleFood:any;
    setSingleFood:Dispatch<SetStateAction<any>>;
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
    paymentMethod: string;
    setPaymentMethod: Dispatch<SetStateAction<string>>;
}