import { Metadata } from 'next';
import Heading from '../components/shared/headings/Heading';
import CartCalculation from '../components/ui/cart/CartCalculation';
import CartLists from '../components/ui/cart/CartLists';

export const metadata: Metadata = {
    title: 'Cart - FavFood',
    description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const CartPage = () => {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10 md:flex gap-10 justify-between'>
            {/* Product Details */}
            <div className='w-full md:w-9/12'>
                <Heading heading={'Shopping Cart'} />
                <CartLists />
            </div>
            {/* Cart Calculation */}
            <CartCalculation />
        </div>
    );
};

export default CartPage;