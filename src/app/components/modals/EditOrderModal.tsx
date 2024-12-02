'use client'
import { DataContext } from '@/app/context/DataContext';
import { useHandleInputChange } from '@/app/hooks/useHandleInputChange';
import { useGetDataQuery } from '@/app/lib/features/api/apiSlice';
import { setOpenOrderEditModal, setSingleDataId } from '@/app/lib/features/commonFeaturesSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { DataContextType } from '@/app/types/DataContextTypes';
import { OrderDataType } from '@/app/types/DataTypes';
import { updateData } from '@/app/utils/updateData';
import { FormEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SubHeading from '../shared/headings/SubHeading';
import Processing from '../spinner/Processing';


const EditOrderModal = () => {
    const { formData, setFormData } = useContext(DataContext) as DataContextType;
    const inputStyle = 'w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none';
    //Get Orders Data from server
    const { data: orders, refetch } = useGetDataQuery('/orders');
    const { openOrderEditModal, singleDataId } = useAppSelector((state) => state.commonFeatures)
    const dispatch = useAppDispatch();
    //GEt single order
    const [singleOrder, setSingleOrder] = useState<OrderDataType>();
    useEffect(() => {
        const getSingleOrder = async () => {
            const singleOrder = orders?.find((order: OrderDataType) => order._id === singleDataId);
            setSingleOrder(singleOrder);
        }
        getSingleOrder();
    }, [singleDataId, openOrderEditModal, setOpenOrderEditModal]);
    const [isUpdating, setIsUpdating] = useState(false);
    const statuses = ['Pending', 'On Hold', 'Processing', 'Packaging', 'Shipped', 'Delivered'];
    //Handle Input Change for Update or Add New Data.
    const handleInputChange = useHandleInputChange();
    const handleUpdateOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
        const form = e.target as HTMLFormElement;
        //Update the order in the database
        const data = await updateData(`/orders?id=${singleOrder?._id}`, formData);
        if (data.acknowledged) {
            toast.success('Order Updated Successfully.');
            form.reset();
            setIsUpdating(false);
            dispatch(setOpenOrderEditModal())
            dispatch(setSingleDataId(''))
            setFormData({})
            refetch();
        }
    }
    return (
        <>
            {
                openOrderEditModal && <div className={`w-full min-h-screen flex items-center justify-center absolute py-10 md:py-0 md:fixed left-0 top-0 z-50 bg-gray-900 bg-opacity-60`}>
                    <div className='w-11/12 md:w-2/5  flex items-center bg-gray-700 text-white p-5 my-5 md:my-0 rounded-md relative'>
                        <button
                            onClick={() => {
                                dispatch(setOpenOrderEditModal())
                                dispatch(setSingleDataId(''))
                            }}
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
                                        <input type="text" name="orderAmount" id="orderAmount"
                                            className={`${inputStyle}`}
                                            defaultValue={singleOrder?.orderAmount}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='w-full md:w-2/4'>
                                        <label htmlFor="orderStatus" className="block mb-2 text-sm">Order Status</label>
                                        <select
                                            className={`${inputStyle}`}
                                            value={formData.orderStatus}
                                            name="orderStatus"
                                            id="orderStatus"
                                            onChange={handleInputChange}
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
                                        <label htmlFor="paymentStatus" className="block mb-2 text-sm">Payment</label>
                                        <select
                                            className={`${inputStyle}`}
                                            value={formData.paymentStatus}
                                            onChange={handleInputChange}
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
                                    <input type="text" name="streetAddress" id="streetAddress"
                                        className={`${inputStyle}`}
                                        defaultValue={singleOrder?.deliveryAddress?.streetAddress}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {/* //City and State */}
                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="city" className="block mb-2 text-sm">City</label>
                                        <input type="text" name="city" id="city"
                                            className={`${inputStyle}`}
                                            defaultValue={singleOrder?.deliveryAddress?.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block mb-2 text-sm">State/Division</label>
                                        <input type="text" name="state" id="state"
                                            className={`${inputStyle}`}
                                            defaultValue={singleOrder?.deliveryAddress?.state}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='w-2/4'>
                                        <label htmlFor="zipCode" className="block mb-2 text-sm">ZIP Code</label>
                                        <input type="text" name="zipCode" id="zipCode"
                                            className={`${inputStyle}`}
                                            defaultValue={singleOrder?.deliveryAddress?.zipCode}
                                            onChange={handleInputChange}
                                        />
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