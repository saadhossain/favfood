'use client';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';

export const fetchSingleFoodData = (restaurant, slug) => {
    const [singleFood, setSingleFood] = useState([]);
    const { setLoading } = useContext(DataContext);
    useEffect(() => {
        const getSingleFoodData = async () => {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/api/foods/single?restaurant=${restaurant}&slug=${slug}`, { cache: 'no-store' });
            const data = await res.json();
            setSingleFood(data.result[0]);
            setLoading(false);
        };
        getSingleFoodData();
    }, [restaurant, slug]);
    return singleFood;
};