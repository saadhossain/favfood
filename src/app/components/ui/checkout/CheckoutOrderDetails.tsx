'use client'
import { setCartProducts } from '@/app/lib/features/cartSlice';
import { getDataFromLocalStorage } from '@/app/utils/getDataFromLocalStorage';
import { getTotalPrice } from '@/app/utils/getTotalPrice';
import CartSummeryLoader from '../../spinner/CartSummeryLoader';
import OrderDetails from './OrderDetails';

const CheckoutOrderDetails = () => {
    // Get products from localstorage and set them to setProductsInLocalStorage state
    getDataFromLocalStorage('favFoodCart', setCartProducts);
    //Calculate total price of all product in the cart
    const totalPrice = getTotalPrice();
    return (
        <div className='w-full md:w-4/12 bg-gray-100 p-4'>
            {
                !totalPrice ? <CartSummeryLoader /> : < OrderDetails totalPrice={totalPrice} />
            }
        </div>
    );
};

export default CheckoutOrderDetails;