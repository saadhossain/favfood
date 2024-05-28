import { Dispatch, SetStateAction } from 'react';
import { FoodData, OrderDataType } from './DataTypes';

export interface DataContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    foods: [] | any;
    setFoods: Dispatch<SetStateAction<[] | any>>;
    singleFood: [] | any;
    setSingleFood: Dispatch<SetStateAction<[] | any>>;
    tabQuery: string;
    setTabQuery: Dispatch<SetStateAction<string>>;
    cartQuantity: number;
    setCartQuantity: Dispatch<SetStateAction<number>>;
    cartProducts: [] | any;
    setCartProducts: Dispatch<SetStateAction<[] | any>>;
    wishlistQuantity: number;
    setWishlistQuantity: Dispatch<SetStateAction<number>>;
    wishlistProducts: [] | any;
    setWishlistProducts: Dispatch<SetStateAction<[] | any>>;
    paymentMethod: string;
    setPaymentMethod: Dispatch<SetStateAction<string>>;
    isOrderConfirm: boolean;
    setIsOrderConfirm: Dispatch<SetStateAction<boolean>>;
    userOrders: OrderDataType | [] | any;
    setUserOrders: Dispatch<SetStateAction<OrderDataType | [] | any>>
    searchedFoods: [] | any;
    setSearchedFoods: Dispatch<SetStateAction<[] | any>>;
    searchText: FoodData[] | any;
    setSearchText: Dispatch<SetStateAction<FoodData[] | any>>;
    isSearchModalOpen: boolean;
    setIsSearchModalOpen: Dispatch<SetStateAction<boolean>>;
    openAddressBoxModal: boolean;
    setOpenAddressBoxModal: Dispatch<SetStateAction<boolean>>;
    showPassword: boolean;
    setShowPassword: Dispatch<SetStateAction<boolean>>;
    adminData: [] | any;
    setAdminData: Dispatch<SetStateAction<[] | any>>;
    singleRestaurant: any;
    setSingleRestaurant: Dispatch<SetStateAction<any>>;
    reviewData: any;
    setReviewData: Dispatch<SetStateAction<any>>;
    initialData: [] | any;
    setInitialData: Dispatch<SetStateAction<[] | any>>;
}