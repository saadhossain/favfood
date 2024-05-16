'use client';
import { useContext } from 'react';
import CartItemsLoader from '../components/spinner/CartItemsLoader';
import CartSummeryLoader from '../components/spinner/CartSummeryLoader';
import CartSummery from '../components/ui/cart/CartSummery';
import ProductsTable from '../components/ui/cart/ProductsTable';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';
import { getDataFromLocalStorage } from '../utils/getDataFromLocalStorage';
import { getProductsInCart } from '../utils/getProductsInCart';
import { getTotalPrice } from '../utils/getTotalPrice';
import Heading from '../components/shared/headings/Heading';
import SubHeading from '../components/shared/headings/SubHeading';

const CartPage = () => {
    const { loading, setCartProducts } = useContext(DataContext) as DataContextType;
    // Get products from localstorage and set them to setProductsInLocalStorage state
    getDataFromLocalStorage('favFoodCart', setCartProducts);

    //Get all products in the cart
    const productsInCart = getProductsInCart();
    //Calculate total price of all product in the cart
    const totalPrice = getTotalPrice();
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10 md:flex gap-10 justify-between'>
            {/* Product Details */}
            <div className='w-full md:w-9/12'>
                <Heading heading={'Shopping Cart'}/>
                {
                    (loading || !productsInCart) ? <CartItemsLoader /> : <ProductsTable
                        productsInCart={productsInCart}
                        setCartProducts={setCartProducts}
                    />
                }
            </div>
            {/* Cart Calculation */}
            <div className={`w-full md:w-3/12 ${productsInCart?.length <= 0 && 'hidden'}`}>
                <SubHeading heading={'Cart Summery'}/>
                {
                    (loading || !productsInCart) ? <CartSummeryLoader /> : <CartSummery totalPrice={totalPrice} />
                }
            </div>
        </div>
    );
};

export default CartPage;