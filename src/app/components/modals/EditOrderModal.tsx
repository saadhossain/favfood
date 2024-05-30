'use client'
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { OrderDataType } from '@/app/types/DataTypes';
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin';
import { updateData } from '@/app/utils/updateData';
import { FormEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SubHeading from '../shared/headings/SubHeading';
import Processing from '../spinner/Processing';


const EditOrderModal = () => {
    const { openOrderEditModal, setOpenOrderEditModal, singleOrderId } = useContext(DataContext) as DataContextType;
    const inputStyle = 'w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none';
    const orders = fetchDataForAdmin('/api/orders');

    //GEt single order
    const [singleOrder, setSingleOrder] = useState<OrderDataType>();
    useEffect(() => {
        const getSingleOrder = async () => {
            const singleOrder = orders.find((order: OrderDataType) => order._id === singleOrderId);
            setSingleOrder(singleOrder);
        }
        getSingleOrder();
    }, [openOrderEditModal]);
    const [isUpdating, setIsUpdating] = useState(false);
    const statuses = ['Pending', 'Processing', 'Packaging', 'Shipped', 'Delivered'];
    //Set the order Status to the state
    const [orderStatus, setOrderStatus] = useState(singleOrder?.orderStatus);
    //Set the Payment Status to the state
    const [paymentStatus, setPaymentStatus] = useState(singleOrder?.paymentStatus);
    const handleUpdateOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
        const form = e.target as HTMLFormElement;
        const orderAmount = form.orderAmount.value;
        //Addresses
        const streetAddress = form.streetAddress.value;
        const city = form.city.value;
        const state = form.state.value;
        const zipCode = form.zipCode.value;

        const updatedOrderData = {
            orderAmount: orderAmount || singleOrder?.orderAmount,
            orderStatus: orderStatus || singleOrder?.orderStatus,
            paymentStatus: paymentStatus || singleOrder?.paymentStatus,
            deliveryAddress: {
                streetAddress: streetAddress || singleOrder?.deliveryAddress.streetAddress,
                city: city || singleOrder?.deliveryAddress.city,
                state: state || singleOrder?.deliveryAddress.state,
                zipCode: zipCode || singleOrder?.deliveryAddress.zipCode
            }
        }
        //Update the order in the database
        const data = await updateData(`/orders?id=${singleOrder?._id}`, updatedOrderData);
        if (data.acknowledged) {
            toast.success('Order Updated Successfully.');
            form.reset();
            setIsUpdating(false);
            setOpenOrderEditModal(false);
        }
    }
    return (
        <>
            {
                openOrderEditModal && <div className={`w-full min-h-screen flex items-center justify-center fixed left-0 top-0 z-50 bg-gray-900 bg-opacity-60`}>
                    <div className='w-11/12 md:w-2/5  flex items-center bg-gray-700 text-white p-5 my-5 md:my-0 rounded-md relative'>
                        <button
                            onClick={() => setOpenOrderEditModal(false)}
                            className='font-bold text-xl absolute top-1 right-2 bg-gray-900 bg-opacity-60 py-1 px-3 rounded-full'>X</button>
                        <form
                            onSubmit={handleUpdateOrder}
                            className="w-full space-y-6"
                        >
                            {/* Order Details */}
                            <div className="space-y-4">
                                <SubHeading heading={'Order Details'} />
                                <div className='w-full flex flex-col md:flex-row gap-2'>
                                    <div className='w-full md:w-1/4'>
                                        <label htmlFor="orderAmount" className="block mb-2 text-sm">Order Amount</label>
                                        <input type="text" name="orderAmount" id="orderAmount" className={`${inputStyle}`} defaultValue={singleOrder?.orderAmount} />
                                    </div>
                                    <div className='w-full md:w-2/4'>
                                        <label htmlFor="orderStatus" className="block mb-2 text-sm">Order Status</label>
                                        <select
                                            className={`${inputStyle}`}
                                            value={orderStatus}
                                            onChange={(e) => setOrderStatus(e.target.value)}
                                            name="orderStatus"
                                            id="orderStatus"
                                        >
                                            <option value="">Change Status</option>
                                            {
                                                statuses.map((status: string, index: number) => <option
                                                    key={index}
                                                    value={status}
                                                >{status}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className='w-full md:w-1/4'>
                                        <label htmlFor="paymentStatus" className="block mb-2 text-sm">Payment Status</label>
                                        <select
                                            className={`${inputStyle}`}
                                            value={paymentStatus}
                                            onChange={(e) => setPaymentStatus(e.target.value)}
                                            name="paymentStatus"
                                            id="paymentStatus"
                                        >
                                            <option value="">Select</option>
                                            <option value="Unpaid">Unpaid</option>
                                            <option value="Paid">Paid</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* //Delivery Address */}
                            <div className="space-y-4">
                                <SubHeading heading={'Delivery Address'} />
                                <div>
                                    <label htmlFor="streetAddress" className="block mb-2 text-sm">Street Address</label>
                                    <input type="text" name="streetAddress" id="streetAddress" className={`${inputStyle}`} defaultValue={singleOrder?.deliveryAddress?.streetAddress} />
                                </div>
                                {/* //City and State */}
                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="city" className="block mb-2 text-sm">City</label>
                                        <input type="text" name="city" id="city" className={`${inputStyle}`} defaultValue={singleOrder?.deliveryAddress?.city} />
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block mb-2 text-sm">State/Division</label>
                                        <input type="text" name="state" id="state" className={`${inputStyle}`} defaultValue={singleOrder?.deliveryAddress?.state} />
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='w-2/4'>
                                        <label htmlFor="zipCode" className="block mb-2 text-sm">ZIP Code</label>
                                        <input type="text" name="zipCode" id="zipCode" className={`${inputStyle}`} defaultValue={singleOrder?.deliveryAddress?.zipCode} />
                                    </div>
                                    <div className='w-2/4'>
                                        <label htmlFor="country" className="block mb-2 text-sm">Country</label>
                                        <p className={`${inputStyle}`}>{singleOrder?.deliveryAddress?.country}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">
                                        {isUpdating ? <Processing title={'Processing'} /> : 'Update Order'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default EditOrderModal