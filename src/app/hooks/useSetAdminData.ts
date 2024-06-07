'use client'

import { useEffect } from 'react';
import { setAdminData, setInitialData } from '../lib/features/adminDataSlice';
import { useGetAdminDataQuery } from '../lib/features/api/apiSlice';
import { useAppDispatch } from '../lib/hooks';

export const useSetAdminData = (enpoint: string) => {
    const { isLoading, data, refetch } = useGetAdminDataQuery(`${enpoint}`);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            dispatch(setAdminData(data))
            dispatch(setInitialData(data))
        }
    }, [data])
    return { isLoading, refetch }
}