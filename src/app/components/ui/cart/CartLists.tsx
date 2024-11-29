'use client';
import { useAppSelector } from '@/app/lib/hooks';
import { useState } from 'react';
import TableSkeletonLoader from '../../spinner/TableSkeletonLoader';
import ProductsTable from '../../tables/ProductsTable';

const CartLists = () => {
    const [isLoading, setIsLoading] = useState(true);

    //Get all products from the cart
    const { productsInCart } = useAppSelector((state) => state.cart);

    //Set a timeout while getting cart data from the localstorage
    setTimeout(() => {
        setIsLoading(false);
    }, 10);
    return (
        <div>
            {
                (isLoading || !productsInCart) ? <TableSkeletonLoader /> : <ProductsTable
                    productsInCart={productsInCart}
                />
            }
        </div>
    );
};

export default CartLists;