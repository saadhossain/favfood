import { Dispatch, SetStateAction } from 'react';

export const handleDashboardSearch = (text: string, initialData: any[], setAdminData: Dispatch<SetStateAction<[] | any>>) => {
    if (text === "") {
        setAdminData(initialData);
    } else {
        const lowerCaseText = text.toLowerCase();
        const foundItems = initialData.filter((data: any) =>
            Object.values(data).some(value =>
                (typeof value === 'string' || typeof value === 'number') &&
                (typeof value === 'string' ? value.toLowerCase().includes(lowerCaseText) :
                    value.toString().toLowerCase().includes(lowerCaseText))
            )
        );
        setAdminData(foundItems);
    }
};
