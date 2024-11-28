'use client';
import { DataContext } from '@/app/context/DataContext';
import { useAppSelector } from '@/app/lib/hooks';
import { DataContextType } from '@/app/types/DataContextTypes';
import { useContext } from 'react';
import TableSkeletonLoader from '../../spinner/TableSkeletonLoader';
import ProductsTable from '../../tables/ProductsTable';

const CartLists = () => {
    const { loading } = useContext(DataContext) as DataContextType;

    //Get all products from the cart
    const { productsInCart } = useAppSelector((state) => state.cart);
    return (
        <div>
            {
                (loading || !productsInCart) ? <TableSkeletonLoader /> : <ProductsTable
                    productsInCart={productsInCart}
                />
            }
        </div>
    );
};

export default CartLists;