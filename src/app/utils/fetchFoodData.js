'use client';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';

export const fetchFoodData = (tabQuery) => {
    const [foods, setFoods] = useState([]);
    const { setLoading } = useContext(DataContext);
    useEffect(() => {
        const getFoodData = async () => {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/api/foods?tabQuery=${tabQuery}`, { next: { revalidate: 30 } });
            const { result } = await res.json();
            setFoods(result);
            setLoading(false);
        };
        getFoodData();
    }, [tabQuery]);
    return foods;
};