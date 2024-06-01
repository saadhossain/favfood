'use client';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const fetchSingleRestaurantData = (name: string) => {
    const { setLoading, singleRestaurant, setSingleRestaurant } = useContext(DataContext) as DataContextType;
    useEffect(() => {
        const getSingleRestaurantData = async () => {
            setLoading(true);
            const res = await fetch(`/api/restaurants/single?name=${name}`);
            const data = await res.json();
            setSingleRestaurant(data.result[0]);
            setLoading(false);
        };
        getSingleRestaurantData();
    }, [name]);
    return singleRestaurant;
};