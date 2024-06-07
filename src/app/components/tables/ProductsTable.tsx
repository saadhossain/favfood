'use client';
import { setCartCount } from '@/app/lib/features/cartSlice';
import { useAppDispatch } from '@/app/lib/hooks';
import { CartDataType } from '@/app/types/DataTypes';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

const ProductsTable = ({ productsInCart, setCartProducts }: { productsInCart: any, setCartProducts: any }) => {
    const dispatch = useAppDispatch();
    const handleDecrementQuantity = (id: string) => {
        // Update local storage and state
        updateLocalStorage(id, -1);
    };

    const handleIncrementQuantity = (id: string) => {
        // Update local storage and state
        updateLocalStorage(id, 1);
    };

    const updateLocalStorage = (id: string, change: number) => {
        let productInLocalStorage = JSON.parse(localStorage.getItem('favFoodCart') as string);
        const existingProduct = productInLocalStorage.findIndex((item: CartDataType) => item.productId === id);

        if (existingProduct >= 0) {
            if (productInLocalStorage[existingProduct].quantity + change > 0) {
                productInLocalStorage[existingProduct].quantity += change;
                localStorage.setItem('favFoodCart', JSON.stringify(productInLocalStorage));
                dispatch(setCartProducts(productInLocalStorage))
            }
        }
    };

    const handleRemoveProductFromCart = (id: string) => {
        let productsInLocalStorage = JSON.parse(localStorage.getItem('favFoodCart') as string);
        const updatedProducts = productsInLocalStorage.filter((item: CartDataType) => item.productId !== id);
        // Update local storage with the updated products
        localStorage.setItem('favFoodCart', JSON.stringify(updatedProducts));

        // //If there is no product in the favFoodCart then completely remove the array
        // if (updatedProducts.length <= 0) {
        //     localStorage.removeItem('favFoodCart');
        // }
        dispatch(setCartProducts(updatedProducts))
        dispatch(setCartCount(updatedProducts.length))
        toast.error('Food removed from cart.');
    };

    return (
        <div>
            {
                productsInCart?.length <= 0 ? <h1 className='text-lg font-semibold text-gray-800'>There is not Product in the Cart. <Link href='/' className='text-primary'>Go to Shop</Link></h1> : (
                    <div className={`container p-2 mx-auto sm:p-4 text-gray-900 ${productsInCart?.length <= 0 && 'hidden'}`}>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <colgroup>
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col className="w-24" />
                                </colgroup>
                                <thead className="bg-gray-300">
                                    <tr className="text-center">
                                        {/* Product Remove Button */}
                                        <th className="p-3"></th>
                                        {/* Product Image */}
                                        <th className="p-3"></th>
                                        <th className="md:p-3 text-left pr-28">Product</th>
                                        <th className="md:p-3 px-6">Price</th>
                                        <th className="p-3">Quantity</th>
                                        <th className="p-3">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productsInCart?.map((cartProduct: any) => <tr key={cartProduct?.product?._id} className="text-center border-b border-opacity-20 border-gray-500 bg-gray-100">
                                            <td className="p-3">
                                                <button onClick={() => handleRemoveProductFromCart(cartProduct?.product?._id)} className='text-red-600 font-bold'>X</button>
                                            </td>
                                            <td className="p-3 hidden md:block">
                                                <Link href={`/food/${cartProduct?.product?.restaurant.toLowerCase()}/${cartProduct?.product?.slug}`}>
                                                    <Image src={cartProduct?.product?.image} alt={cartProduct?.product?.name} width={60} height={40} className='rounded-md' />
                                                </Link>
                                            </td>
                                            <div className='w-16 h-10 mt-2 md:hidden'>
                                                <Image src={cartProduct?.product?.image} alt={cartProduct?.product?.name} width={60} height={40} className='rounded-md' />
                                            </div>
                                            <td className="p-3 text-left">
                                                <Link href={`/food/${cartProduct?.product?.restaurant.toLowerCase()}/${cartProduct?.product?.slug}`}>{cartProduct?.product?.name}</Link>
                                            </td>
                                            <td className="p-3">
                                                <p>$ {cartProduct?.product?.price}</p>
                                            </td>
                                            <td className="p-3">
                                                <div className='flex gap-1 items-center justify-center'>
                                                    <button onClick={() => handleDecrementQuantity(cartProduct?.product?._id)} className='font-bold text-xl text-gray-800'>-</button>
                                                    <p className='px-4 border border-gray-500'>{cartProduct?.quantity}</p>
                                                    <button onClick={() => handleIncrementQuantity(cartProduct?.product?._id)} className='font-bold text-xl text-gray-800'>+</button>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <p>$ {((cartProduct?.product?.price * cartProduct?.quantity).toFixed(2))}</p>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ProductsTable;