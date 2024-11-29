'use client';
import { DataContext } from '@/app/context/DataContext';
import { useAppSelector } from '@/app/lib/hooks';
import { DataContextType } from '@/app/types/DataContextTypes';
import { getTotalPrice } from '@/app/utils/getTotalPrice';
import { useContext } from 'react';
import SubHeading from '../../shared/headings/SubHeading';
import CartSummeryLoader from '../../spinner/CartSummeryLoader';
import CartSummery from './CartSummery';

const CartCalculation = () => {
    const { loading } = useContext(DataContext) as DataContextType;

    //Get all products in the cart
    const { productsInCart } = useAppSelector((state) => state.cart);
    //Calculate total price of all product in the cart
    const totalPrice = getTotalPrice(productsInCart);
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