'use client';
import { OrderDataType } from '@/app/types/DataTypes';
import Image from 'next/image';
import Link from 'next/link';

const OrdersTable = ({ userOrders }: { userOrders: OrderDataType | any }) => {
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
                                                    order.products.map(({ product }: any) => <div key={product._id} className='flex items-center gap-2'>
                                                        <Image src={product.image} alt={product.name} width={80} height={60} className='rounded-md' />
                                                        <p>{product.name.length > 20 ? product.name.slice(0, 24) + '...' : product.name}</p>
                                                    </div>)
                                                }
                                            </th>
                                            <th className="md:p-3 px-6">${order.orderAmount}</th>
                                            <th className="p-3">{order.paymentStatus}</th>
                                            <th className="p-3">{order.orderStatus}</th>
                                            {/* Product Action Buttons */}
                                            <th className="p-3">
                                                <div className='flex flex-col gap-1 items-center'>
                                                    <button className='bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600'>Cancel</button>
                                                    <button className='bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600'>Track Package</button>
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