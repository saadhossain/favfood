'use client';
import { DataContext } from '@/app/context/DataContext';
import { setCartProducts } from '@/app/lib/features/cartSlice';
import { DataContextType } from '@/app/types/DataContextTypes';
import { getDataFromLocalStorage } from '@/app/utils/getDataFromLocalStorage';
import { getProductsInCart } from '@/app/utils/getProductsInCart';
import { useContext } from 'react';
import TableSkeletonLoader from '../../spinner/TableSkeletonLoader';
import ProductsTable from '../../tables/ProductsTable';

const CartLists = () => {
    const { loading } = useContext(DataContext) as DataContextType;
    // Get products from localstorage and set them to setProductsInLocalStorage state
    getDataFromLocalStorage('favFoodCart', setCartProducts);

    //Get all products in the cart
    const productsInCart = getProductsInCart();
    return (
        <div>
            {
                (loading || !productsInCart) ? <TableSkeletonLoader /> : <ProductsTable
                    productsInCart={productsInCart}
                    setCartProducts={setCartProducts}
                />
            }
        </div>
    );
};

export default CartLists;