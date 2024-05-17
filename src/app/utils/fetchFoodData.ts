'use client';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const fetchFoodData = (tabQuery: string, page: number) => {
    const { setLoading, foods, setFoods } = useContext(DataContext) as DataContextType;

    //Fetch the data from the api...
    useEffect(() => {
        const getFoodData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/foods?tabQuery=${tabQuery}&page=${page}&limit=12`, { cache: 'no-store' });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { result } = await res.json();
                if (page === 1) {
                    setFoods(result);
                } else {
                    setFoods((prevFoods: any) => [...prevFoods, ...result]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        getFoodData();

    }, [setLoading,tabQuery, page]);

    return foods;
};