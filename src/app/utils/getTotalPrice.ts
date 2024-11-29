import { CartProdType } from '../types/DataTypes';

export const getTotalPrice = (productsInCart: any) => {
    return productsInCart?.reduce((total: number, prod: CartProdType) => {
        // Calculate subtotal for each item (product price * quantity)
        const subtotal = prod?.price * prod?.quantity;
        // Add subtotal to the total
        return total + subtotal;
    }, 0);
};