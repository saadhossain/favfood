'use client'
import { setUserData } from '../lib/features/userDataSlice';
import { useAppDispatch, useAppSelector } from '../lib/hooks';

export const useHandleDashboardSearch = () => {
    const { initialData } = useAppSelector((state) => state.userData);
    const dispatch = useAppDispatch();
    const handleDashboardSearch = (text: string) => {
        if (text === "") {
            dispatch(setUserData(initialData));
        } else {
            const lowerCaseText = text.toLowerCase();
            const foundItems = initialData.filter((data: any) =>
                Object.values(data).some(value =>
                    (typeof value === 'string' || typeof value === 'number') &&
                    (typeof value === 'string' ? value.toLowerCase().includes(lowerCaseText) :
                        value.toString().toLowerCase().includes(lowerCaseText))
                )
            );
            dispatch(setUserData(foundItems));
        }
    }
    return handleDashboardSearch;
};
