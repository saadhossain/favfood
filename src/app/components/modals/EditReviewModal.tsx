'use client'
import { DataContext } from '@/app/context/DataContext';
import { useHandleInputChange } from '@/app/hooks/useHandleInputChange';
import { useGetDataQuery } from '@/app/lib/features/api/apiSlice';
import { setOpenEditReviewModal } from '@/app/lib/features/commonFeaturesSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { DataContextType } from '@/app/types/DataContextTypes';
import { ReviewData } from '@/app/types/DataTypes';
import { updateData } from '@/app/utils/updateData';
import { FormEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SubHeading from '../shared/headings/SubHeading';
import Processing from '../spinner/Processing';


const EditReviewModal = () => {
    const { formData } = useContext(DataContext) as DataContextType;
    const inputStyle = 'w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none';
    //Get Reviews Data from server
    const { data: reviews, refetch } = useGetDataQuery('/reviews');
    const dispatch = useAppDispatch();
    const { singleDataId, openEditReviewModal } = useAppSelector((state) => state.commonFeatures)
    //GEt single Review
    const [singleReview, setSingleReview] = useState<ReviewData>();
    useEffect(() => {
        const getSingleReview = async () => {
            const singleReview = reviews?.find((review: ReviewData) => review._id === singleDataId);
            setSingleReview(singleReview);
        }
        getSingleReview();
    }, [singleDataId, openEditReviewModal]);
    //Handle Input Change for Update or Add New Data.
    const handleInputChange = useHandleInputChange();
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    //Handle the Modify the Review
    const handleEditReview = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
        const form = e.target as HTMLFormElement;
        //Update the order in the database
        const data = await updateData(`/reviews?id=${singleDataId}`, formData);
        if (data.acknowledged) {
            toast.success('Review Edit Successfully.');
            form.reset();
            setIsUpdating(false);
            dispatch(setOpenEditReviewModal())
            refetch();
        }
    }
    return (
        <>
            {
                openEditReviewModal && <div className={`w-full min-h-screen flex items-center justify-center absolute py-10 md:py-0 md:fixed left-0 top-0 z-50 bg-gray-900 bg-opacity-60`}>
                    <div className='w-11/12 md:w-2/5  flex items-center bg-gray-700 text-white p-5 my-5 md:my-0 rounded-md relative'>
                        <button
                            onClick={() => dispatch(setOpenEditReviewModal())}
                            className='font-bold text-xl absolute top-1 right-2 bg-gray-900 bg-opacity-60 py-1 px-3 rounded-full'>X</button>
                        <form
                            onSubmit={handleEditReview}
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
                                        defaultValue={singleReview?.title}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="rating" className="block mb-2 text-sm">Rating</label>
                                    <input type="text" name="rating" id="rating"
                                        className={`${inputStyle}`}
                                        onChange={handleInputChange}
                                        defaultValue={singleReview?.rating}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mb-2 text-sm">Description</label>
                                    <textarea name="description" id="description"
                                        className={`${inputStyle}`}
                                        onChange={handleInputChange}
                                        defaultValue={singleReview?.description}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">
                                        {isUpdating ? <Processing title={'Processing'} /> : 'Update Review'}
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

export default EditReviewModal