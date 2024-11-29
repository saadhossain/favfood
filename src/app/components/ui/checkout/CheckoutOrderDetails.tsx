'use client'
import { useAppSelector } from '@/app/lib/hooks';
import { getTotalPrice } from '@/app/utils/getTotalPrice';
import CartSummeryLoader from '../../spinner/CartSummeryLoader';
import OrderDetails from './OrderDetails';

const CheckoutOrderDetails = () => {
    //Get the added products from the cart
    const { productsInCart } = useAppSelector((state) => state.cart)
    //Calculate total price of all product in the cart
    const totalPrice = getTotalPrice(productsInCart);
    return (
        <div className='w-full md:w-4/12 bg-gray-100 p-4'>
            {
                !totalPrice ? <CartSummeryLoader /> : < OrderDetails totalPrice={totalPrice} />
            }
        </div>
    );
};

export default CheckoutOrderDetails;