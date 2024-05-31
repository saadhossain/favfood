'use client';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { OrderDataType } from '@/app/types/DataTypes';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaRegCreditCard } from "react-icons/fa";
import { FaShop } from 'react-icons/fa6';
import { HiCursorArrowRipple } from "react-icons/hi2";
import { MdOutlineRateReview } from "react-icons/md";
import { TbProgressCheck, TbShoppingBagEdit } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";

const OrdersTable = ({ userOrders }: { userOrders: OrderDataType[] }) => {
    const { openOrderEditModal, setOpenOrderEditModal, setSingleDataId, openAddReviewModal, setOpenAddReviewModal } = useContext(DataContext) as DataContextType;
    const { data: session } = useSession();
    const handleCancelOrder = async (orderId: string | undefined, orderStatus: string) => {
        const isConfirmed = window.confirm('Do you agree to Cancel this order?');
        if (orderStatus !== 'processing') {
            toast.error('You can not cancel this order.');
            return;
        }
        if (isConfirmed && orderStatus === 'processing') {
            const res = await fetch(`/api/orders?orderId=${orderId}`, {
                method: 'DELETE'
            });
            const { result } = await res.json();
            console.log(result);
            if (result.acknowledged) {
                toast.success('Order Deleted Successfully.');
            }
        }
    }
    return (
        <div className='w-full'>
            {
                userOrders?.length <= 0 ? <h1 className='text-lg font-semibold text-gray-800'>No Order Found. <Link href='/' className='text-primary'>Go to Shop</Link></h1> : (
                    <div className={`container py-2 mx-auto sm:py-4 text-gray-900 ${userOrders?.length <= 0 && 'hidden'}`}>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <colgroup>
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                </colgroup>
                                <thead className="bg-gray-300">
                                    <tr className="text-center">
                                        {/* Product Remove Button */}
                                        <th className="p-3 text-left">Product</th>
                                        <th className="md:p-3 px-6">Total</th>
                                        <th className="p-3">Payment</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userOrders?.map((order: OrderDataType) => <tr
                                            key={order._id}
                                            className="text-center border-b-2 border-gray-200">
                                            {/* Product Image and product name */}
                                            <th className="md:p-3 flex flex-col gap-2">
                                                {
                                                    order?.products?.map((product: any) => <div key={product?._id} className='flex gap-2 items-center'>
                                                        <Link
                                                            href={`/foods/${product.restaurantName.toLowerCase()}/${product.slug}`}
                                                            className='w-20 py-2 md:py-0'
                                                        >
                                                            <Image src={product.image} alt={product.name} width={80} height={60} className='rounded-md' />
                                                        </Link>
                                                        {/* Name, Shop Name and Quantity */}
                                                        <div>
                                                            <Link
                                                                href={`/foods/${product.restaurantName.toLowerCase()}/${product.slug}`}
                                                                className='hover:text-secondary duration-300 ease-in-out hidden md:block'
                                                            >
                                                                {product.name.length > 20 ? product.name.slice(0, 24) + '...' : product.name}
                                                            </Link>
                                                            <div className='flex flex-col md:flex-row gap-2 md:gap-3'>
                                                                <Link
                                                                    href={`/restaurants/${product.restaurantName.toLowerCase()}`}
                                                                    className='flex gap-1 items-center hover:text-secondary duration-300 ease-in-out'
                                                                >
                                                                    <FaShop />
                                                                    {product.restaurantName}
                                                                </Link>
                                                                <p className='text-left font-normal'>Qty: <span className='font-semibold'>{product.quantity}</span></p>
                                                            </div>
                                                        </div>
                                                    </div>)
                                                }
                                            </th>
                                            <th className="md:p-3 px-6">${order.orderAmount}</th>
                                            <th className="p-3 capitalize">{order.paymentStatus}</th>
                                            <th className="p-3 capitalize">{order.orderStatus}</th>
                                            {/* Product Action Buttons */}
                                            <th className="p-3">
                                                <div className='flex gap-1 items-center justify-center'>
                                                    <TiDelete
                                                        onClick={() => handleCancelOrder(order._id, order.orderStatus)}
                                                        className='w-8 h-8 cursor-pointer text-red-500' title='Cancel' />
                                                    {
                                                        session?.user.role === 'admin' ? <div className='flex gap-1 items-center justify-center'>
                                                            <TbShoppingBagEdit
                                                                className='w-6 h-6 text-green-600 cursor-pointer'
                                                                title='Modify Order'
                                                                onClick={() => {
                                                                    setOpenOrderEditModal(!openOrderEditModal)
                                                                    setSingleDataId(order._id)
                                                                }}
                                                            />
                                                        </div> :
                                                            <div className='flex gap-1 items-center justify-center'>
                                                                <button
                                                                    className='flex relative'
                                                                    title='Pay Now'
                                                                >
                                                                    <FaRegCreditCard className='w-6 h-6' />
                                                                    <HiCursorArrowRipple className='text-primary absolute -bottom-1 left-4' />
                                                                </button>
                                                                <TbProgressCheck className='w-6 h-6 cursor-pointer text-green-600' title='Track Package' />
                                                                <MdOutlineRateReview
                                                                    className='w-6 h-6 cursor-pointer'
                                                                    title='Write a Review'
                                                                    onClick={() => {
                                                                        setOpenAddReviewModal(!openAddReviewModal)
                                                                        setSingleDataId(order._id)
                                                                    }}
                                                                />
                                                            </div>
                                                    }
                                                </div>
                                            </th>
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

export default OrdersTable;