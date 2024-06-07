import { ChangeEvent } from 'react';
import { setFormData } from '../lib/features/formSlice';
import { useAppDispatch } from '../lib/hooks';

export const useHandleInputChange = () => {
    // const { formData, setFormData } = useContext(DataContext) as DataContextType;
    const dispatch = useAppDispatch();
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(setFormData({ name, value }))
        // setFormData({
        //     ...formData,
        //     [name]: value,
        // });
    };
    return handleInputChange;
}