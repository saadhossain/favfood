'use client';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';

export const getProductsFromLocalStorage = (localStorageKey, stateToSetProducts) => {
    const { setLoading } = useContext(DataContext);
    // Get products from localstorage and set them to state
    useEffect(() => {
        setLoading(true);
        const products = JSON.parse(localStorage.getItem(localStorageKey));
        if (products) {
            stateToSetProducts(products);
        }
        setLoading(false);
    }, []);
};