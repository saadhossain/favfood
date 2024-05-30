'use client';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const fetchReviewData = (query: string, id: string) => {
    const { setLoading, reviewData, setReviewData } = useContext(DataContext) as DataContextType;
    useEffect(() => {
        const getReview = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/reviews/${query}?id=${id}`, { cache: 'no-store' });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const {result} = await res.json();
                setReviewData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        getReview();

    }, [setLoading, id]);

    return reviewData;
};