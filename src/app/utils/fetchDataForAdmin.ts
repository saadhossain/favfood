'use client';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const fetchDataForAdmin = (apiEndpoint: string) => {
    const { setLoading, adminData, setAdminData } = useContext(DataContext) as DataContextType;
    //Fetch the data from the api...
    useEffect(() => {
        const getAdminData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${apiEndpoint}`, { cache: 'no-store' });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { result } = await res.json();
                setAdminData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        getAdminData();

    }, [apiEndpoint]);

    return adminData;
};