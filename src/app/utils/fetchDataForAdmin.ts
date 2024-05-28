import { Dispatch, SetStateAction } from 'react';

export const fetchDataForAdmin = async (
    apiEndpoint: string,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setAdminData: Dispatch<SetStateAction<[] | any>>,
    setInitialData: Dispatch<SetStateAction<[] | any>>
) => {
    setLoading(true);
    try {
        const res = await fetch(apiEndpoint, { cache: 'no-store' });
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
};
