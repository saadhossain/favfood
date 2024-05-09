'use client';
import { createContext, useEffect, useState } from 'react';

export const DataContext = createContext();
const DataProvider = ({ children }) => {
    //Loading state
    const [loading, setLoading] = useState(false);

    const [tabQuery, setTabQuery] = useState('all-food');

    //Cart
    //Set Cart Quantity from localStorage
    const [cartQuantity, setCartQuantity] = useState(0);
    //Get the initial cart quantity from the localStorage
    useEffect(()=>{
        const cartCount = JSON.parse(localStorage.getItem('favFoodCart'));
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
        const wishlist = JSON.parse(localStorage.getItem('favFoodWishlist'));
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