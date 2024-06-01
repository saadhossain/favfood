'use client';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const fetchSingleFoodData = (restaurant: string, slug: string) => {
    const { setLoading, singleFood, setSingleFood } = useContext(DataContext) as DataContextType;
    useEffect(() => {
        const getSingleFoodData = async () => {
            setLoading(true);
            const res = await fetch(`/api/foods/single?restaurant=${restaurant}&slug=${slug}`);
            const data = await res.json();
            setSingleFood(data.result[0]);
            setLoading(false);
        };
        getSingleFoodData();
    }, [restaurant, slug]);
    return singleFood;
};