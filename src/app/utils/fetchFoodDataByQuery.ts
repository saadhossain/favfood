'use client';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { setFoods } from '../lib/features/foodSlice';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { DataContextType } from '../types/DataContextTypes';

export const fetchFoodDataByQuery = (tabQuery: string, page: number) => {
    const { setLoading } = useContext(DataContext) as DataContextType;
    const dispatch = useAppDispatch();
    const { foods } = useAppSelector((state) => state.food)
    //Fetch the data from the api...
    useEffect(() => {
        const getFoodData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/foods?tabQuery=${tabQuery}&page=${page}&limit=12`);
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { result } = await res.json();
                if (page === 1) {
                    dispatch(setFoods(result));
                } else {
                    dispatch(setFoods((prevFoods: any) => [...prevFoods, ...result]));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        getFoodData();

    }, [setLoading, tabQuery, page]);

    return foods;
};