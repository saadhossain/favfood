import { Metadata } from 'next';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Heading from '../components/shared/headings/Heading';
import CheckoutAddressBook from '../components/ui/checkout/CheckoutAddressBook';
import CheckoutOrderDetails from '../components/ui/checkout/CheckoutOrderDetails';


export const metadata: Metadata = {
    title: 'Checkout - FavFood',
    description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const CheckoutPage = () => {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10 md:flex gap-10 justify-between'>
            <div className='w-full md:w-8/12'>
                <Heading heading={'Secure Checkout'} />
                {/* Delivery Address */}
                <h3 className='flex items-center gap-2 text-lg md:text-xl font-semibold'><FaMapMarkerAlt className='text-primary' />Delivery Address</h3>
                {/* Address Boxes */}
                <CheckoutAddressBook />
            </div>
            {/* Order Details */}
            <CheckoutOrderDetails />
        </div>
    );
};

export default CheckoutPage;