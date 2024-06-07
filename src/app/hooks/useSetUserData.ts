'use client'

import { useEffect } from 'react';
import { useGetDataQuery } from '../lib/features/api/apiSlice';
import { setInitialData, setUserData } from '../lib/features/userDataSlice';
import { useAppDispatch } from '../lib/hooks';

export const useSetUserData = (enpoint: string) => {
    const { isLoading, data, refetch } = useGetDataQuery(`${enpoint}`);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            dispatch(setUserData(data))
            dispatch(setInitialData(data))
        }
    }, [data])
    return { isLoading, refetch }
}