'use client';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const fetchFoodData = (tabQuery:string) => {
    const [foods, setFoods] = useState([]);
    const { setLoading } = useContext(DataContext) as DataContextType;
    useEffect(() => {
        const getFoodData = async () => {
            setLoading(true);
            const res = await fetch(`/api/foods?tabQuery=${tabQuery}`, { cache: 'no-store' });
            const { result } = await res.json();
            setFoods(result);
            setLoading(false);
        };
        getFoodData();
    }, [tabQuery]);
    return foods;
};