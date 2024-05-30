'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { DataContextType } from '../types/DataContextTypes';
import { OrderDataType } from '../types/DataTypes';

export const DataContext = createContext<DataContextType | null>(null);
const DataProvider = ({ children }: { children: ReactNode }) => {
    //Loading state
    const [loading, setLoading] = useState(false);
    //Set fetched food data to the state
    const [foods, setFoods] = useState([]);

    //Get single food data and set state accordingly
    const [singleFood, setSingleFood] = useState([]);
    const [tabQuery, setTabQuery] = useState('all-food');

    //Cart
    //Set Cart Quantity from localStorage
    const [cartQuantity, setCartQuantity] = useState(0);
    //Get the initial cart quantity from the localStorage
    useEffect(() => {
        const cart = localStorage.getItem('favFoodCart') as string;
        const cartCount = JSON.parse(cart);
        if (cartCount) {
            setCartQuantity(cartCount.length);
        }
    }, []);
    //Set the product to the state from localStorage
    const [cartProducts, setCartProducts] = useState([]);
    //Set wishlist Quantity from localStorage
    const [wishlistQuantity, setWishlistQuantity] = useState(0);
    //Get the initial wishlist quantity from the localStorage
    useEffect(() => {
        const wishlistLocal = localStorage.getItem('favFoodWishlist') as string;
        const wishlist = JSON.parse(wishlistLocal);
        if (wishlist) {
            setWishlistQuantity(wishlist.length);
        }
    }, []);
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
            setCartQuantity(0);
        }
    }, [isOrderConfirm]);

    const [userOrders, setUserOrders] = useState<OrderDataType | any>();

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
    const [adminData, setAdminData] = useState([]);
    //Get the admin data and set as initial data to the initial data state
    const [initialData, setInitialData] = useState([]);
    //Set single Restaurant Data to the state
    const [singleRestaurant, setSingleRestaurant] = useState([]);

    //Set the review data to the state
    const [reviewData, setReviewData] = useState([]);
    //State to handle open close the order edit modal
    const [openOrderEditModal, setOpenOrderEditModal] = useState(false);

    //State to handle open close the order edit modal
    const [openUserEditModal, setOpenUserEditModal] = useState(false);

    //State to set the single order id for EditOrderModal
    const [singleDataId, setSingleDataId] = useState('');

    const allData = { loading, setLoading, foods, setFoods, singleFood, setSingleFood, tabQuery, setTabQuery, cartQuantity, setCartQuantity, cartProducts, setCartProducts, wishlistQuantity, setWishlistQuantity, wishlistProducts, setWishlistProducts, paymentMethod, setPaymentMethod, isOrderConfirm, setIsOrderConfirm, userOrders, setUserOrders, searchedFoods, setSearchedFoods, searchText, setSearchText, isSearchModalOpen, setIsSearchModalOpen, openAddressBoxModal, setOpenAddressBoxModal, showPassword, setShowPassword, adminData, setAdminData, singleRestaurant, setSingleRestaurant, reviewData, setReviewData, initialData, setInitialData, openOrderEditModal, setOpenOrderEditModal, singleDataId, setSingleDataId, openUserEditModal, setOpenUserEditModal };
    return (
        <div>
            <DataContext.Provider value={allData}>
                {children}
            </DataContext.Provider>
        </div>
    );
};

export default DataProvider;