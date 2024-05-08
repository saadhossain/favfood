'use client'
import { FaMapMarkerAlt } from 'react-icons/fa';
import CartSummeryLoader from '../components/spinner/CartSummeryLoader';
import OrderDetails from '../components/ui/checkout/OrderDetails';
import { getProductsFromLocalStorage } from '../utils/getProductsFromLocalStorage';
import { getTotalPrice } from '../utils/getTotalPrice';

const CheckoutPage = () => {
    // Get products from localstorage and set them to setProductsInLocalStorage state
    getProductsFromLocalStorage();
    //Calculate total price of all product in the cart
    const totalPrice = getTotalPrice();
    return (
        <div className='w-10/12 mx-auto my-10 flex gap-10 justify-between'>
            <div className='w-8/12'>
                <h2 className='text-2xl font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>Secure Checkout</h2>
                {/* Delivery Address */}
                <h3 className='flex items-center gap-2 text-xl font-semibold'><FaMapMarkerAlt className='text-primary' />Delivery Address</h3>
                {/* Address Boxes */}
                <div className='w-full flex items-center gap-4 mt-5'>
                    {/* Default Address */}
                    <div className='w-2/4 bg-primary text-white rounded-md p-4'>
                        <FaMapMarkerAlt className='w-5 h-5 mb-2' />
                        <p>
                            Apt: 23, House: 18, Block-B,<br />
                            Lane-5, Section-10, Dhaka.
                        </p>
                    </div>
                    {/* Inactive Address */}
                    <div className='w-2/4 text-gray-800 border-2 border-dashed border-gray-800 rounded-md p-4'>
                        <FaMapMarkerAlt className='w-5 h-5 mb-2' />
                        <p>
                            Apt: 83, House: 31, Block-F,<br />
                            Lane-8, Section-13, Dhaka.
                        </p>
                    </div>
                </div>
                {/* Special Note */}
                <div className='my-5'>
                    <h5 className='text-md font-semibold mb-2'>Special Note</h5>
                    <form>
                        <textarea row={5} placeholder="Write your special note here." className="w-full px-3 py-2 rounded-md border border-gray-800 text-gray-900 focus:outline-none" />
                    </form>
                </div>
            </div>
            {/* Order Details */}
            <div className='w-4/12 bg-gray-100 p-4'>
                {
                    !totalPrice ? <CartSummeryLoader /> : < OrderDetails totalPrice={totalPrice} />
                }
            </div>
        </div>
    );
};

export default CheckoutPage;