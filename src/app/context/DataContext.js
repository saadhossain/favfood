'use client';
import { createContext, useEffect, useState } from 'react';

export const DataContext = createContext();
const DataProvider = ({ children }) => {
    //Loading state
    const [loading, setLoading] = useState(false);

    const [tabQuery, setTabQuery] = useState('all-food');

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

    const allData = { loading, setLoading, tabQuery, setTabQuery, cartQuantity, setCartQuantity, productsInLocalStorage, setProductsInLocalStorage };
    return (
        <div>
            <DataContext.Provider value={allData}>
                {children}
            </DataContext.Provider>
        </div>
    );
};

export default DataProvider;