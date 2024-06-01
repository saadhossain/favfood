'use client'
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const fetchDataForAdmin = (apiEndpoint: string,) => {
    const { setLoading, adminData, setAdminData, setInitialData } = useContext(DataContext) as DataContextType;
    useEffect(() => {
        const getAdminData = async () => {
            setLoading(true);
            try {
                const res = await fetch(apiEndpoint);
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { result } = await res.json();
                setAdminData(result);
                setInitialData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        getAdminData();
    }, [setAdminData])
    return adminData;
};
