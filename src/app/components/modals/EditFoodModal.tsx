'use client'
import { DataContext } from '@/app/context/DataContext';
import { useHandleInputChange } from '@/app/hooks/useHandleInputChange';
import { useGetDataQuery } from '@/app/lib/features/api/apiSlice';
import { setOpenEditFoodModal, setSingleDataId } from '@/app/lib/features/commonFeaturesSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { DataContextType } from '@/app/types/DataContextTypes';
import { FoodData } from '@/app/types/DataTypes';
import { updateData } from '@/app/utils/updateData';
import { FormEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SubHeading from '../shared/headings/SubHeading';
import Processing from '../spinner/Processing';


const EditFoodModal = () => {
    const { formData, setFormData } = useContext(DataContext) as DataContextType;
    const inputStyle = 'w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none';
    const dispatch = useAppDispatch();
    // const restaurants = data
    const categories = ["Burger", "Pizza", "Sandwich", "Fries", "Chicken"];
    //Get Foods Data from server
    const { data: foods, refetch } = useGetDataQuery('/foods');
    const { data: restaurants } = useGetDataQuery('/restaurants');
    const { openEditFoodModal, singleDataId } = useAppSelector((state) => state.commonFeatures)
    //GEt single Food
    const [singleFood, setSingleFood] = useState<FoodData>();
    useEffect(() => {
        const getSingleFood = async () => {
            const singleFood = foods?.find((food: FoodData) => food._id === singleDataId);
            setSingleFood(singleFood);
        }
        getSingleFood();
    }, [singleDataId, openEditFoodModal, setOpenEditFoodModal]);
    const [isUpdating, setIsUpdating] = useState(false);
    //Handle Input Change for Update or Add New Data.
    const handleInputChange = useHandleInputChange();
    const handleUpdateFood = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(formData);
        setIsUpdating(true);
        const form = e.target as HTMLFormElement;
        //Update the food in the database
        const data = await updateData(`/foods?id=${singleFood?._id}`, formData);
        if (data.acknowledged) {
            toast.success('Food Updated Successfully.');
            form.reset();
            setIsUpdating(false);
            dispatch(setOpenEditFoodModal())
            dispatch(setSingleDataId(''))
            setFormData({})
            refetch();
        }
    }
    return (
        <>
            {
                openEditFoodModal && <div className={`w-full min-h-screen flex items-center justify-center absolute py-10 md:py-0 md:fixed left-0 top-0 z-50 bg-gray-900 bg-opacity-60`}>
                    <div className='w-11/12 md:w-2/5  flex items-center bg-gray-700 text-white p-5 my-5 md:my-0 rounded-md relative'>
                        <button
                            onClick={() => {
                                dispatch(setOpenEditFoodModal())
                                dispatch(setSingleDataId(''))
                            }}
                            className='font-bold text-xl absolute top-1 right-2 bg-gray-900 bg-opacity-60 py-1 px-3 rounded-full'>X</button>
                        <div>
                            <SubHeading heading={'Update Food'} />
                            <form
                                onSubmit={(e) => handleUpdateFood(e)}
                                className="space-y-6">
                                <div className="space-y-2 ">
                                    {/* Name and Price */}
                                    <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
                                        <div className='w-full md:w-4/5'>
                                            <label htmlFor="name" className="font-semibold block mb-2 text-sm">Product Name</label>
                                            <input type="text" name="name" id="name" className={`${inputStyle}`}
                                                defaultValue={singleFood?.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='w-full md:w-1/5'>
                                            <label htmlFor="price" className="font-semibold block mb-2 text-sm">Price</label>
                                            <div className='w-full px-2 flex items-center rounded-md bg-gray-300 text-gray-900'>
                                                <span className='font-semibold'>$</span>
                                                <input type="text" name="price" id="price" className={`${inputStyle}`} defaultValue={singleFood?.price}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Category, Restaurant Name */}
                                    <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
                                        <div className='w-full md:w-2/5'>
                                            <label htmlFor="category" className="font-semibold block mb-2 text-sm">Category</label>
                                            <select
                                                className={`${inputStyle}`}
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                name="category"
                                                id="category"
                                            >
                                                <option value="">Select a Category</option>
                                                {
                                                    categories.map((category: string, index: number) => <option
                                                        key={index}
                                                        value={category}
                                                    >{category}</option>)
                                                }
                                            </select>
                                        </div>
                                        <div className='w-full md:w-2/5'>
                                            <label htmlFor="restrauName" className="font-semibold block mb-2 text-sm">Restaurant Name</label>
                                            <select
                                                className={`${inputStyle}`}
                                                value={formData.restaurant}
                                                onChange={handleInputChange}
                                                name="restaurant"
                                                id="restaurant"
                                            >
                                                <option value="">Select a Restaurant</option>
                                                {
                                                    restaurants?.map((restaurant: any) => <option
                                                        key={restaurant._id}
                                                        value={restaurant.name}
                                                    >{restaurant.name}</option>)
                                                }
                                            </select>
                                        </div>
                                        <div className='w-full md:w-1/5'>
                                            <label htmlFor="discountPercentage" className="font-semibold block mb-2 text-sm">Discount %</label>
                                            <div className='w-full px-2 flex items-center rounded-md bg-gray-300 text-gray-900'>
                                                <span className='font-semibold'>%</span>
                                                <input type="text" name="discountPercentage" id="discountPercentage"
                                                    className={`${inputStyle}`}
                                                    defaultValue={singleFood?.discountPercentage}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="font-semibold text-sm">Description</label>
                                        <textarea name="description" id="description" className={`${inputStyle}`}
                                            onChange={handleInputChange}
                                            defaultValue={singleFood?.description}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">{isUpdating ? <Processing title={'Processing'} /> : 'Update Food'}</button>
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

export default EditFoodModal