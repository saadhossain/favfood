'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { DataContextType } from '../types/DataContextTypes';

export const DataContext = createContext<DataContextType | null>(null);
const DataProvider = ({ children }: {children: ReactNode}) => {
    //Loading state
    const [loading, setLoading] = useState(false);

    const [tabQuery, setTabQuery] = useState('all-food');

    //Cart
    //Set Cart Quantity from localStorage
    const [cartQuantity, setCartQuantity] = useState(0);
    //Get the initial cart quantity from the localStorage
    useEffect(()=>{
        const cart = localStorage.getItem('favFoodCart') as string;
        const cartCount = JSON.parse(cart);
        if (cartCount) {
            setCartQuantity(cartCount.length);
        }
    },[]);
    //Set the product to the state from localStorage
    const [productsInLocalStorage, setProductsInLocalStorage] = useState();


    //WishList
    //Set wishlist Quantity from localStorage
    const [wishlistQuantity, setWishlistQuantity] = useState(0);
    //Get the initial wishlist quantity from the localStorage
    useEffect(()=>{
        const wishlistLocal = localStorage.getItem('favFoodWishlist') as string;
        const wishlist = JSON.parse(wishlistLocal);
        if (wishlist) {
            setWishlistQuantity(wishlist.length);
        }
    },[]);
    //Set the wishlist product to the state from localStorage
    const [wishlistInLocalStorage, setWishlistInLocalStorage] = useState();

    const allData = { loading, setLoading, tabQuery, setTabQuery, cartQuantity, setCartQuantity, productsInLocalStorage, setProductsInLocalStorage, wishlistQuantity, setWishlistQuantity,  wishlistInLocalStorage, setWishlistInLocalStorage};
    return (
        <div>
            <DataContext.Provider value={allData}>
                {children}
            </DataContext.Provider>
        </div>
    );
};

export default DataProvider;