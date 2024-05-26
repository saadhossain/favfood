'use client';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const fetchUserOrders = (session: any) => {
    const { setLoading, userOrders, setUserOrders } = useContext(DataContext) as DataContextType;
    const userId = session?.user._id;
    //Get User orders from database
    useEffect(() => {
        const getUserOrders = async () => {
            setLoading(true);
            const res = await fetch(`/api/orders/user/?userId=${userId}`, { cache: 'no-store' });
            const { result } = await res.json();
            setUserOrders(result);
            setLoading(false);
        };
        getUserOrders();
    }, [setLoading, session]);
    return userOrders;
};