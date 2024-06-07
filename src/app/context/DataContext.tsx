'use client';
import { ReactNode, createContext, useState } from 'react';
import { DataContextType } from '../types/DataContextTypes';

export const DataContext = createContext<DataContextType | null>(null);
const DataProvider = ({ children }: { children: ReactNode }) => {
    //Loading state
    const [loading, setLoading] = useState(false);
    //Set fetched food data to the state
    const [foods, setFoods] = useState([]);
    const [tabQuery, setTabQuery] = useState('all-food');
    //Get the payment method
    const [paymentMethod, setPaymentMethod] = useState('');

    //Declare the state for open and close the address box modal
    const [openAddressBoxModal, setOpenAddressBoxModal] = useState(false);

    //state for show and hide the password field
    const [showPassword, setShowPassword] = useState(true);
    //Get and Set the admin data

    //State to handle open close the order edit modal
    const [openOrderEditModal, setOpenOrderEditModal] = useState(false);

    //State to handle open close the order edit modal
    const [openUserEditModal, setOpenUserEditModal] = useState(false);

    //State to handle open close the add review modal
    const [openAddReviewModal, setOpenAddReviewModal] = useState(false);

    //State to handle open close the review edit modal
    const [openEditReviewModal, setOpenEditReviewModal] = useState(false);

    //State to set the single order id for EditOrderModal
    const [singleDataId, setSingleDataId] = useState('');

    //Set the FormData to the State as object when input changes
    const [formData, setFormData] = useState<any>({});

    const allData = { loading, setLoading, foods, setFoods, tabQuery, setTabQuery, paymentMethod, setPaymentMethod, openAddressBoxModal, setOpenAddressBoxModal, showPassword, setShowPassword, openOrderEditModal, setOpenOrderEditModal, singleDataId, setSingleDataId, openUserEditModal, setOpenUserEditModal, formData, setFormData, openAddReviewModal, setOpenAddReviewModal, openEditReviewModal, setOpenEditReviewModal };
    return (
        <div>
            <DataContext.Provider value={allData}>
                {children}
            </DataContext.Provider>
        </div>
    );
};

export default DataProvider;