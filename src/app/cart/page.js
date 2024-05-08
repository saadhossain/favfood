'use client';
import { useContext, useEffect } from 'react';
import CartItemsLoader from '../components/spinner/CartItemsLoader';
import CartSummeryLoader from '../components/spinner/CartSummeryLoader';
import CartSummery from '../components/ui/cart/CartSummery';
import ProductsTable from '../components/ui/cart/ProductsTable';
import { DataContext } from '../context/DataContext';
import { getProductsInCart } from '../utils/getProductsInCart';
import { getTotalPrice } from '../utils/getTotalPrice';

const CartPage = () => {
    const { loading, setLoading, setProductsInLocalStorage } = useContext(DataContext);

    useEffect(() => {
        setLoading(true);
        const cart = JSON.parse(localStorage.getItem('favFoodCart'));
        if (cart) {
            setProductsInLocalStorage(cart);
        }
        setLoading(false);
    }, []);

    //Get the matched products in the localStorage
    const productsInCart = getProductsInCart();
    const totalPrice = getTotalPrice();

    // console.log(totalPrice);
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-10 flex gap-10 justify-between'>
            {/* Product Details */}
            <div className='w-full md:w-9/12'>
                <h2 className='text-2xl font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>Shopping Cart</h2>
                {
                    (loading || !productsInCart) ? <CartItemsLoader /> : <ProductsTable
                        productsInCart={productsInCart}
                        setProductsInLocalStorage={setProductsInLocalStorage}
                    />
                }
            </div>
            {/* Cart Calculation */}
            <div className='w-full md:w-3/12'>
                <h3 className='text-xl font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>Cart Summery</h3>
                {
                    (loading || !productsInCart) ? <CartSummeryLoader /> : <CartSummery totalPrice={totalPrice} />
                }
            </div>
        </div>
    );
};

export default CartPage;