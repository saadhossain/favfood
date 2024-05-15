'use client';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const fetchSingleFoodData = (restaurant:string, slug:string) => {
    const [singleFood, setSingleFood] = useState([]);
    const { setLoading } = useContext(DataContext) as DataContextType;
    useEffect(() => {
        const getSingleFoodData = async () => {
            setLoading(true);
            const res = await fetch(`/api/foods/single?restaurant=${restaurant}&slug=${slug}`, { cache: 'no-store' });
            const data = await res.json();
            setSingleFood(data.result[0]);
            setLoading(false);
        };
        getSingleFoodData();
    }, [restaurant, slug]);
    return singleFood;
};