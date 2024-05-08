'use client';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';

export const getProductsFromLocalStorage = () => {
    const { setLoading, setProductsInLocalStorage } = useContext(DataContext);
    // Get products from localstorage and set them to state
    useEffect(() => {
        setLoading(true);
        const cart = JSON.parse(localStorage.getItem('favFoodCart'));
        if (cart) {
            setProductsInLocalStorage(cart);
        }
        setLoading(false);
    }, []);
};