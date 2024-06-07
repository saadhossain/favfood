import { Dispatch, SetStateAction } from 'react';

export interface DataContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    foods: [] | any;
    setFoods: Dispatch<SetStateAction<[] | any>>;
    tabQuery: string;
    setTabQuery: Dispatch<SetStateAction<string>>;
    formData: {} | any;
    setFormData: Dispatch<SetStateAction<{} | any>>
}