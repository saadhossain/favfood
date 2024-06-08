'use client'
import { DataContext } from '@/app/context/DataContext';
import { useHandleInputChange } from '@/app/hooks/useHandleInputChange';
import { useGetDataQuery } from '@/app/lib/features/api/apiSlice';
import { setOpenAddReviewModal, setSingleDataId } from '@/app/lib/features/commonFeaturesSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { DataContextType } from '@/app/types/DataContextTypes';
import { OrderDataType } from '@/app/types/DataTypes';
import { saveToDatabase } from '@/app/utils/saveToDatabase';
import { useSession } from 'next-auth/react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SubHeading from '../shared/headings/SubHeading';
import Processing from '../spinner/Processing';


const AddReviewModal = () => {
    const { formData, setFormData } = useContext(DataContext) as DataContextType;
    const { data: session } = useSession();
    const inputStyle = 'w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none';
    //Get Foods Data from server
    const { data: orders } = useGetDataQuery('/orders');
    const dispatch = useAppDispatch();
    const { openAddReviewModal, singleDataId } = useAppSelector((state) => state.commonFeatures);

    //GEt single order
    const [singleOrder, setSingleOrder] = useState<OrderDataType>();
    useEffect(() => {
        const getSingleOrder = async () => {
            const singleOrder = orders?.find((order: OrderDataType) => order._id === singleDataId);
            setSingleOrder(singleOrder);
        }
        getSingleOrder();
    }, [openAddReviewModal]);
    const [isAddingReview, setIsAddingReview] = useState(false);
    //Handle Input Change for Update or Add New Data.
    const handleInputChange = useHandleInputChange();
    //Handle the Add or Modify the Review
    const handleAddReview = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsAddingReview(true);
        const form = e.target as HTMLFormElement;
        //Arrange the Review Data...
        const reviewData = {
            ...formData,
            foodId: singleOrder?.products[0]._id,
            foodSlug: singleOrder?.products[0].slug,
            restaurantName: singleOrder?.products[0].restaurantName,
            userId: session?.user._id,
            userName: session?.user.fullName,
            userProfileImage: session?.user.image,
            addedOn: new Date(),
        }
        //Update the order in the database
        const data = await saveToDatabase('/api/reviews', reviewData);
        if (data.status) {
            toast.success('Review Added Successfully.');
            form.reset();
            setIsAddingReview(false);
            dispatch(setOpenAddReviewModal())
        } else {
            toast.error(data.message);
            setIsAddingReview(false);
            dispatch(setOpenAddReviewModal())
            dispatch(setSingleDataId(''))
            setFormData({})
        }
    }
    return (
        <>
            {
                openAddReviewModal && <div className={`w-full min-h-screen flex items-center justify-center absolute py-10 md:py-0 md:fixed left-0 top-0 z-50 bg-gray-900 bg-opacity-60`}>
                    <div className='w-11/12 md:w-2/5  flex items-center bg-gray-700 text-white p-5 my-5 md:my-0 rounded-md relative'>
                        <button
                            onClick={() => {
                                dispatch(setOpenAddReviewModal())
                                dispatch(setSingleDataId(''))
                            }}
                            className='font-bold text-xl absolute top-1 right-2 bg-gray-900 bg-opacity-60 py-1 px-3 rounded-full'>X</button>
                        <form
                            onSubmit={handleAddReview}
                            className="w-full space-y-6"
                        >
                            {/* Review Details */}
                            <div className="space-y-4">
                                <SubHeading heading={'Write a Review'} />
                                <div>
                                    <label htmlFor="title" className="block mb-2 text-sm">Title</label>
                                    <input type="text" name="title" id="title"
                                        className={`${inputStyle}`}
                                        onChange={handleInputChange}
                                        placeholder='Enter the Title'
                                    />
                                </div>
                                <div>
                                    <label htmlFor="rating" className="block mb-2 text-sm">Rating</label>
                                    <input type="text" name="rating" id="rating"
                                        className={`${inputStyle}`}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mb-2 text-sm">Description</label>
                                    <textarea name="description" id="description"
                                        className={`${inputStyle}`}
                                        onChange={handleInputChange}
                                        placeholder='Write your Review Here...'
                                    ></textarea>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">
                                        {isAddingReview ? <Processing title={'Processing'} /> : 'Add Review'}
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

export default AddReviewModal