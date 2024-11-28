'use client';
import { decrementQuantity, incrementQuantity, removeFromCart } from '@/app/lib/features/cartSlice';
import { useAppDispatch } from '@/app/lib/hooks';
import { CartProdType } from '@/app/types/DataTypes';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

const ProductsTable = ({ productsInCart }: { productsInCart: CartProdType[] }) => {
    const dispatch = useAppDispatch();
    const handleRemoveFromCart = (id: string) => {
        const confirmation = window.confirm('Would you like to Remove this Product?');
        if (confirmation) {
            dispatch(removeFromCart(id))
            toast.success('Product Removed from Cart.')
        }
    }
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
                                        productsInCart?.map((cartProduct: any) => <tr key={cartProduct?._id} className="text-center border-b border-opacity-20 border-gray-500 bg-gray-100">
                                            <td className="p-3">
                                                <button
                                                    onClick={() => handleRemoveFromCart(cartProduct?._id)}
                                                    className='text-red-600 font-bold'>X</button>
                                            </td>
                                            <td className="p-3 hidden md:block">
                                                <Link href={`/food/${cartProduct?.restaurantName.toLowerCase()}/${cartProduct?.slug}`}>
                                                    <Image src={cartProduct?.image} alt={cartProduct?.name} width={60} height={40} className='rounded-md' />
                                                </Link>
                                            </td>
                                            <div className='w-16 h-10 mt-2 md:hidden'>
                                                <Image src={cartProduct?.image} alt={cartProduct?.name} width={60} height={40} className='rounded-md' />
                                            </div>
                                            <td className="p-3 text-left">
                                                <Link href={`/food/${cartProduct?.restaurantName.toLowerCase()}/${cartProduct?.slug}`}>{cartProduct?.name}</Link>
                                            </td>
                                            <td className="p-3">
                                                <p>$ {cartProduct?.price}</p>
                                            </td>

                                            {/* Quantity Amount and Buttons */}
                                            <td className="p-3">
                                                <div className='flex gap-1 items-center justify-center'>
                                                    <button
                                                        onClick={() => dispatch(decrementQuantity(cartProduct?._id))}
                                                        className='font-bold text-xl text-gray-800'>-</button>
                                                    <p className='px-4 border border-gray-500'>{cartProduct?.quantity}</p>
                                                    <button
                                                        onClick={() => dispatch(incrementQuantity(cartProduct?._id))}
                                                        className='font-bold text-xl text-gray-800'>+</button>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <p>$ {((cartProduct?.price * cartProduct?.quantity).toFixed(2))}</p>
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