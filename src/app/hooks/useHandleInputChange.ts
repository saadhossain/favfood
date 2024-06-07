import { ChangeEvent, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';

export const useHandleInputChange = () => {
    const { formData, setFormData } = useContext(DataContext) as DataContextType;
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return handleInputChange;
}