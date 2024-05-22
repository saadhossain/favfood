import { Dispatch, SetStateAction } from 'react';
import { FoodData, OrderDataType } from './DataTypes';

export interface DataContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    foods: any;
    setFoods: Dispatch<SetStateAction<any>>;
    singleFood: any;
    setSingleFood: Dispatch<SetStateAction<any>>;
    tabQuery: string;
    setTabQuery: Dispatch<SetStateAction<string>>;
    cartQuantity: number;
    setCartQuantity: Dispatch<SetStateAction<number>>;
    cartProducts: any;
    setCartProducts: any;
    wishlistQuantity: number;
    setWishlistQuantity: Dispatch<SetStateAction<number>>;
    wishlistProducts: any;
    setWishlistProducts: any;
    paymentMethod: string;
    setPaymentMethod: Dispatch<SetStateAction<string>>;
    isOrderConfirm: boolean;
    setIsOrderConfirm: Dispatch<SetStateAction<boolean>>;
    userOrders: OrderDataType | any;
    setUserOrders: Dispatch<SetStateAction<OrderDataType | any>>
    searchedFoods: any;
    setSearchedFoods: Dispatch<SetStateAction<any>>;
    searchText: FoodData[] | any;
    setSearchText: Dispatch<SetStateAction<FoodData[] | any>>;
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    showPassword: boolean;
    setShowPassword: Dispatch<SetStateAction<boolean>>;
}