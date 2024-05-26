'use client';
import { OrderDataType } from '@/app/types/DataTypes';
import Image from 'next/image';
import Link from 'next/link';
import { TbProgressCheck } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
import { MdOutlineRateReview } from "react-icons/md";

const OrdersTable = ({ userOrders }: { userOrders: OrderDataType[] }) => {
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
                                        <th className="md:p-3 text-left">Product</th>
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
                                                    order.products.map((product: any) => <div key={product?._id} className='flex gap-2 items-center'>
                                                        <Link href={`/foods/${product.restaurantName.toLowerCase()}/${product.slug}`}>
                                                            <Image src={product.image} alt={product.name} width={80} height={60} className='rounded-md' />
                                                        </Link>
                                                        <div>
                                                            <Link href={`/foods/${product.restaurantName.toLowerCase()}/${product.slug}`}>
                                                                {product.name.length > 20 ? product.name.slice(0, 24) + '...' : product.name}
                                                            </Link>
                                                            <p className='text-left'>X {product.quantity}</p>
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
                                                    <TiDelete className='w-8 h-8 cursor-pointer text-red-500' title='Cancel' />
                                                    <TbProgressCheck className='w-6 h-6 cursor-pointer text-green-600' title='Track Package' />
                                                    <MdOutlineRateReview className='w-6 h-6 cursor-pointer' title='Write a Review'/>
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