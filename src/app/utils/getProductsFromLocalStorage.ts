'use client';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const getProductsFromLocalStorage = (localStorageKey:string, stateToSetProducts:Dispatch<SetStateAction<string>>) => {
    const { setLoading } = useContext(DataContext) as DataContextType;
    // Get products from localstorage and set them to state
    useEffect(() => {
        setLoading(true);
        const products = JSON.parse(localStorage.getItem(localStorageKey) as string);
        if (products) {
            stateToSetProducts(products);
        }
        setLoading(false);
    }, []);
};