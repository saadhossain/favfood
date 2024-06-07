'use client';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { useAppDispatch } from '../lib/hooks';
import { DataContextType } from '../types/DataContextTypes';

export const getDataFromLocalStorage = (localStorageKey: string, stateToSetData: any) => {
    const { setLoading } = useContext(DataContext) as DataContextType;
    const dispatch = useAppDispatch();
    // Get products from localstorage and set them to state
    useEffect(() => {
        setLoading(true);
        const data = JSON.parse(localStorage.getItem(localStorageKey) as string);
        if (data) {
            dispatch(stateToSetData(data));
        }
        setLoading(false);
    }, []);
};