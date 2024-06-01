'use client';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const fetchFoodData = () => {
    const { setLoading, foods, setFoods } = useContext(DataContext) as DataContextType;

    //Fetch the data from the api...
    useEffect(() => {
        const getFoodData = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/foods');
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { result } = await res.json();
                setFoods(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        getFoodData();

    }, []);

    return foods;
};