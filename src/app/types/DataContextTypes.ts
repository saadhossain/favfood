import { Dispatch, SetStateAction } from 'react';

export interface DataContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    foods: [] | any;
    setFoods: Dispatch<SetStateAction<[] | any>>;
    tabQuery: string;
    setTabQuery: Dispatch<SetStateAction<string>>;
    paymentMethod: string;
    setPaymentMethod: Dispatch<SetStateAction<string>>;
    openAddressBoxModal: boolean;
    setOpenAddressBoxModal: Dispatch<SetStateAction<boolean>>;
    showPassword: boolean;
    setShowPassword: Dispatch<SetStateAction<boolean>>;
    openOrderEditModal: boolean;
    setOpenOrderEditModal: Dispatch<SetStateAction<boolean>>;
    singleDataId: string | any;
    setSingleDataId: Dispatch<SetStateAction<string | any>>;
    openUserEditModal: string | any;
    setOpenUserEditModal: Dispatch<SetStateAction<string | any>>;
    formData: {} | any;
    setFormData: Dispatch<SetStateAction<{} | any>>;
    openAddReviewModal: boolean;
    setOpenAddReviewModal: Dispatch<SetStateAction<boolean>>;
    openEditReviewModal: boolean;
    setOpenEditReviewModal: Dispatch<SetStateAction<boolean>>;
}