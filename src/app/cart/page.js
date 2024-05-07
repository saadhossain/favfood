'use client';
import { useContext, useEffect, useState } from 'react';
import CartItemLading from '../components/spinner/CartItemLading';
import ProductsTable from '../components/ui/cart/ProductsTable';
import { DataContext } from '../context/DataContext';
import { fetchFoodData } from '../utils/fetchFoodData';

const CartPage = () => {
    const { loading, setLoading } = useContext(DataContext);
    const [productsInLocalStorage, setProductsInLocalStorage] = useState();

    useEffect(() => {
        setLoading(true);
        const cart = JSON.parse(localStorage.getItem('favFoodCart'));
        if (cart) {
            setProductsInLocalStorage(cart);
        }
        setLoading(false);
    }, []);

    //Get all foods from database
    const foods = fetchFoodData('all-food');
    //Get the matched products in the localStorage
    const productsInCart = productsInLocalStorage?.map(item => {
        const foundProduct = foods.find(food => food._id === item.productId);
        return {
            product: foundProduct,
            quantity: item.quantity
        };
    });
    // console.log(productsInCart);
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-10 flex gap-10 justify-between'>
            <div className='w-full md:w-9/12'>
                <h2 className='text-2xl font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>Shopping Cart</h2>
                {
                    (loading || !productsInCart) ? <CartItemLading /> : <ProductsTable
                        productsInCart={productsInCart}
                        setProductsInLocalStorage={setProductsInLocalStorage}
                    />
                }
                {/* {productsInCart[0]?.product?.price * productsInCart[0]?.quantity} */}
            </div>
        </div>
    );
};

export default CartPage;