'use client'
import { setAdminData } from '../lib/features/adminData/adminDataSlice';
import { useAppDispatch, useAppSelector } from '../lib/hooks';

export const useHandleDashboardSearch = () => {
    const { initialData } = useAppSelector((state) => state.adminData);
    const dispatch = useAppDispatch();
    const handleDashboardSearch = (text: string) => {
        if (text === "") {
            dispatch(setAdminData(initialData));
        } else {
            const lowerCaseText = text.toLowerCase();
            const foundItems = initialData.filter((data: any) =>
                Object.values(data).some(value =>
                    (typeof value === 'string' || typeof value === 'number') &&
                    (typeof value === 'string' ? value.toLowerCase().includes(lowerCaseText) :
                        value.toString().toLowerCase().includes(lowerCaseText))
                )
            );
            dispatch(setAdminData(foundItems));
        }
    }
    return handleDashboardSearch;
};
