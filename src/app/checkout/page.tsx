'use client'
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa';
import Heading from '../components/shared/headings/Heading';
import SubHeading from '../components/shared/headings/SubHeading';
import CartSummeryLoader from '../components/spinner/CartSummeryLoader';
import OrderDetails from '../components/ui/checkout/OrderDetails';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';
import { SessionData } from '../types/DataTypes';
import { getDataFromLocalStorage } from '../utils/getDataFromLocalStorage';
import { getTotalPrice } from '../utils/getTotalPrice';

const CheckoutPage = () => {
    const { data: session } = useSession<SessionData | any>();
    const { setCartProducts, setOpenAddressBoxModal } = useContext(DataContext) as DataContextType;
    // Get products from localstorage and set them to setProductsInLocalStorage state
    getDataFromLocalStorage('favFoodCart', setCartProducts);
    //Calculate total price of all product in the cart
    const totalPrice = getTotalPrice();
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10 md:flex gap-10 justify-between'>
            <div className='w-full md:w-8/12'>
                <Heading heading={'Secure Checkout'} />
                {/* Delivery Address */}
                <h3 className='flex items-center gap-2 text-lg md:text-xl font-semibold'><FaMapMarkerAlt className='text-primary' />Delivery Address</h3>
                {/* Address Boxes */}
                <div className='w-full md:flex items-center gap-4 mt-2 md:mt-5'>
                    {/* Default Address */}
                    {
                        !session?.user?.address?.city ? <SubHeading heading={'No Address Found! Please Add One...'} /> : <div className='w-full md:w-2/4 bg-primary text-white font-semibold rounded-md p-4'>
                            <FaMapMarkerAlt className='w-5 h-5 mb-2' />
                            <p>Street: {session?.user?.address?.streetAddress}</p>
                            <div className='flex items-center gap-5'>
                                <p>City: {session?.user?.address?.city}</p>
                                <p>State: {session?.user?.address?.state}</p>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p>ZIP: {session?.user?.address?.zipCode}</p>
                                <p>Country: {session?.user?.address?.country}</p>
                            </div>
                        </div>
                    }
                    {/* Add New Address Box */}
                    <div
                        onClick={() => setOpenAddressBoxModal(true)}
                        className='w-full md:w-2/4 flex flex-col justify-center text-gray-800 border-2 border-dashed border-gray-800 rounded-md p-4 mt-2 md:mt-0 cursor-pointer h-36'>
                        <p className='flex items-center justify-center gap-2 text-lg'>
                            <FaPlus /> Add New Address
                        </p>
                    </div>
                </div>
                {/* Special Note */}
                <div className='my-5'>
                    <h5 className='text-md font-semibold mb-2'>Special Note</h5>
                    <form>
                        <textarea placeholder="Write your special note here." className="w-full px-3 py-2 rounded-md border border-gray-800 text-gray-900 focus:outline-none" />
                    </form>
                </div>
            </div>
            {/* Order Details */}
            <div className='w-full md:w-4/12 bg-gray-100 p-4'>
                {
                    !totalPrice ? <CartSummeryLoader /> : < OrderDetails totalPrice={totalPrice} />
                }
            </div>
        </div>
    );
};

export default CheckoutPage;