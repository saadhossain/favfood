'use client';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const getDataFromLocalStorage = (localStorageKey: string, stateToSetData: Dispatch<SetStateAction<string>>) => {
    const { setLoading } = useContext(DataContext) as DataContextType;
    // Get products from localstorage and set them to state
    useEffect(() => {
        setLoading(true);
        const data = JSON.parse(localStorage.getItem(localStorageKey) as string);
        console.log(data)
        if (data) {
            stateToSetData(data);
        }
        setLoading(false);
    }, []);
};