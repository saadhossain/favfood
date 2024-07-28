'use client';
import { DataContext } from '@/app/context/DataContext';
import { setCartProducts } from '@/app/lib/features/cartSlice';
import { DataContextType } from '@/app/types/DataContextTypes';
import { getDataFromLocalStorage } from '@/app/utils/getDataFromLocalStorage';
import { getProductsInCart } from '@/app/utils/getProductsInCart';
import { getTotalPrice } from '@/app/utils/getTotalPrice';
import { useContext } from 'react';
import SubHeading from '../../shared/headings/SubHeading';
import CartSummeryLoader from '../../spinner/CartSummeryLoader';
import CartSummery from './CartSummery';

const CartCalculation = () => {
    const { loading } = useContext(DataContext) as DataContextType;
    // Get products from localstorage and set them to setProductsInLocalStorage state
    getDataFromLocalStorage('favFoodCart', setCartProducts);

    //Get all products in the cart
    const productsInCart = getProductsInCart();
    //Calculate total price of all product in the cart
    const totalPrice = getTotalPrice();
    return (
        <div className={`w-full md:w-3/12 ${productsInCart?.length <= 0 && 'hidden'}`}>
            <SubHeading heading={'Cart Summery'} />
            {
                (loading || !productsInCart) ? <CartSummeryLoader /> : <CartSummery totalPrice={totalPrice} />
            }
        </div>
    );
};

export default CartCalculation;