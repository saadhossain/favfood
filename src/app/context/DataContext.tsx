'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { setCartCount } from '../lib/features/cart/cartSlice';
import { useAppDispatch } from '../lib/hooks';
import { DataContextType } from '../types/DataContextTypes';

export const DataContext = createContext<DataContextType | null>(null);
const DataProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();
    //Loading state
    const [loading, setLoading] = useState(false);
    //Set fetched food data to the state
    const [foods, setFoods] = useState([]);
    const [tabQuery, setTabQuery] = useState('all-food');
    //Set the product to the state from localStorage
    const [cartProducts, setCartProducts] = useState([]);
    //Set the wishlist product to the state from localStorage
    const [wishlistProducts, setWishlistProducts] = useState();

    //Get the payment method
    const [paymentMethod, setPaymentMethod] = useState('');

    //Set the order confirmation state
    const [isOrderConfirm, setIsOrderConfirm] = useState(false);
    //Update the cart products and cart count based on order confirmation
    useEffect(() => {
        if (isOrderConfirm) {
            setCartProducts([]);
            dispatch(setCartCount(0))
        }
    }, [isOrderConfirm]);

    //Set the searched product to the state
    const [searchedFoods, setSearchedFoods] = useState([]);

    //Set the search text
    const [searchText, setSearchText] = useState('');

    //Declare the state for open and close the search modal
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
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

    const allData = { loading, setLoading, foods, setFoods, tabQuery, setTabQuery, cartProducts, setCartProducts, wishlistProducts, setWishlistProducts, paymentMethod, setPaymentMethod, isOrderConfirm, setIsOrderConfirm, searchedFoods, setSearchedFoods, searchText, setSearchText, isSearchModalOpen, setIsSearchModalOpen, openAddressBoxModal, setOpenAddressBoxModal, showPassword, setShowPassword, openOrderEditModal, setOpenOrderEditModal, singleDataId, setSingleDataId, openUserEditModal, setOpenUserEditModal, formData, setFormData, openAddReviewModal, setOpenAddReviewModal, openEditReviewModal, setOpenEditReviewModal };
    return (
        <div>
            <DataContext.Provider value={allData}>
                {children}
            </DataContext.Provider>
        </div>
    );
};

export default DataProvider;