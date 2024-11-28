
export const getTotalPrice = (productsInCart: any) => {
    return productsInCart?.reduce((total: number, cartItem: any) => {
        // Calculate subtotal for each item (product price * quantity)
        const subtotal = cartItem?.product?.price * cartItem?.quantity;
        // Add subtotal to the total
        return total + subtotal;
    }, 0);
};