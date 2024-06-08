'use client'
import { DataContext } from '@/app/context/DataContext';
import { useHandleInputChange } from '@/app/hooks/useHandleInputChange';
import { useGetDataQuery } from '@/app/lib/features/api/apiSlice';
import { setOpenEditRestaurantModal, setSingleDataId } from '@/app/lib/features/commonFeaturesSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { DataContextType } from '@/app/types/DataContextTypes';
import { RestaurantData } from '@/app/types/DataTypes';
import { updateData } from '@/app/utils/updateData';
import { FormEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from "react-select";
import SubHeading from '../shared/headings/SubHeading';
import Processing from '../spinner/Processing';
interface categoryProps {
    value: string; label: string,
}



const EditRestaurantModal = () => {
    const { formData, setFormData } = useContext(DataContext) as DataContextType;
    const inputStyle = 'w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none';
    const dispatch = useAppDispatch();
    //Restaurants Food Categories
    const categories: categoryProps[] = [
        { value: "Burger", label: "Burger" },
        { value: "Pizza", label: "Pizza" },
        { value: "Sandwich", label: "Sandwich" },
        { value: "Fries", label: "Fries" },
        { value: "Chicken", label: "Chicken" }
    ]
    const [selectedCategories, setSelectedCategories] = useState<categoryProps[]>([]);
    const handleChange = (selectedCategories: any) => {
        setSelectedCategories(selectedCategories || []);
    };
    //Get Restaurants Data from server
    const { data: restaurants, refetch } = useGetDataQuery('/restaurants');
    const { openEditRestaurantModal, singleDataId } = useAppSelector((state) => state.commonFeatures)
    //Get single Restaurant
    const [singleRestaurant, setSingleRestaurant] = useState<RestaurantData>();
    useEffect(() => {
        const getSingleRestaurant = async () => {
            const singleRestaurant = restaurants?.find((restaurant: RestaurantData) => restaurant._id === singleDataId);
            setSingleRestaurant(singleRestaurant);
        }
        getSingleRestaurant();
    }, [singleDataId, openEditRestaurantModal]);
    const [isUpdating, setIsUpdating] = useState(false);
    //Handle Input Change for Update or Add New Data.
    const handleInputChange = useHandleInputChange();
    const handleUpdateRestaurant = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
        const form = e.target as HTMLFormElement;
        //Update the restaurant in the database
        const data = await updateData(`/restaurants?id=${singleRestaurant?._id}`, formData);
        if (data.acknowledged) {
            toast.success('Restaurant Updated Successfully.');
            form.reset();
            setIsUpdating(false);
            dispatch(setOpenEditRestaurantModal())
            dispatch(setSingleDataId(''))
            setFormData({})
            refetch();
        }
    }
    return (
        <>
            {
                openEditRestaurantModal && <div className={`w-full min-h-screen flex items-center justify-center absolute py-10 md:py-0 md:fixed left-0 top-0 z-50 bg-gray-900 bg-opacity-60`}>
                    <div className='w-11/12 md:w-2/5  flex items-center bg-gray-700 text-white p-5 my-5 md:my-0 rounded-md relative'>
                        <button
                            onClick={() => {
                                dispatch(setOpenEditRestaurantModal())
                                dispatch(setSingleDataId(''))
                            }}
                            className='font-bold text-xl absolute top-1 right-2 bg-gray-900 bg-opacity-60 py-1 px-3 rounded-full'>X</button>
                        <div>
                            <SubHeading heading={'Update Restaurant'} />
                            <form
                                onSubmit={(e) => handleUpdateRestaurant(e)}
                                className="space-y-6">
                                <div className="space-y-2">
                                    <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
                                        <div className='w-full md:w-4/5'>
                                            <label htmlFor="name" className="font-semibold block mb=2 text-sm">Restaurant Name</label>
                                            <input type="text" name="name" id="name"
                                                defaultValue={singleRestaurant?.name}
                                                className={`${inputStyle}`}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='w-full md:w-1/5'>
                                            <label htmlFor="minOrderAmount" className="font-semibold block text-sm">Min Order</label>
                                            <input type="text" name="minOrderAmount" id="minOrderAmount"
                                                defaultValue={singleRestaurant?.minOrderAmount}
                                                className={`${inputStyle}`}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:flex-row items-center gap-2'>
                                        <div className='w-full md:w-1/5'>
                                            <label htmlFor="deliveryCharge" className="font-semibold text-sm">D. Charge</label>
                                            <input type="text" name="deliveryCharge" id="deliveryCharge"
                                                defaultValue={singleRestaurant?.deliveryCharge}
                                                className={`${inputStyle}`}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='w-full md:w-4/5'>
                                            <label htmlFor="category" className="font-semibold text-sm">Select Categories</label>
                                            <Select
                                                className='text-gray-800'
                                                options={categories}
                                                onChange={handleChange}
                                                value={selectedCategories}
                                                isMulti
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">
                                            {isUpdating ? <Processing title={'Processing'} /> : 'Update Restaurant'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default EditRestaurantModal