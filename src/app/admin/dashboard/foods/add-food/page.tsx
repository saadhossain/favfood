'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading';
import Processing from '@/app/components/spinner/Processing';
import { DataContext } from '@/app/context/DataContext';
import { useHandleInputChange } from '@/app/hooks/useHandleInputChange';
import { useGetAdminDataQuery } from '@/app/lib/features/api/apiSlice';
import { DataContextType } from '@/app/types/DataContextTypes';
import { saveToDatabase } from '@/app/utils/saveToDatabase';
import { uploadImgToImgbb } from '@/app/utils/uploadImgToImgbb';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const AddFood = () => {
    const { setLoading, loading, formData } = useContext(DataContext) as DataContextType;
    const [error, setError] = useState('');
    //Get Restaurant Data from server
    const { data: restaurants } = useGetAdminDataQuery('/restaurants');
    const { refetch } = useGetAdminDataQuery('/foods');
    // const restaurants = data
    const categories = ["Burger", "Pizza", "Sandwich", "Fries", "Chicken"];

    const route = useRouter();
    //Get the useHandleInputChange hook to get all the data from the input
    const handleInputChange = useHandleInputChange();

    const handleAddFood = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;

        //Validations
        if (!formData.name || !formData.price || !formData.description || !formData.restaurant || !formData.category) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }
        //Handle profile image and upload to Imgbb
        const imageInput = form.foodImage.files[0];
        //check if image uploaded
        if (!imageInput) {
            setError('Please upload the image, its required.');
            setLoading(false);
            return;
        }
        const imageFormData = new FormData();
        imageFormData.append('image', imageInput);
        const image = await uploadImgToImgbb(imageFormData);

        //Arrange Food data for saving
        const foodData = {
            ...formData,
            price: parseFloat(formData.price),
            image,
            reviewCount: Math.floor(Math.random() * 80),
            itemSold: Math.floor(Math.random() * 100),
            discountPercentage: 0
        };

        try {
            const data = await saveToDatabase('/api/foods', foodData);
            if (data.status) {
                form.reset();
                setLoading(false);
                toast.success('Food added Successful.');
                route.push('/admin/dashboard/foods');
                refetch();
            }
        } catch (error: any) {
            console.log(error.message);
            setLoading(false);
        }
    }
    return (
        <div>
            <SubHeading heading={'Add New Food'} />
            {/* Add New Food */}
            <form
                onSubmit={(e) => handleAddFood(e)}
                className="space-y-6">
                <div className="space-y-2 ">
                    {/* Name and Price */}
                    <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
                        <div className='w-full md:w-4/5'>
                            <label htmlFor="name" className="font-semibold block mb-2 text-sm">Product Name</label>
                            <input type="text" name="name" id="name" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='w-full md:w-1/5'>
                            <label htmlFor="price" className="font-semibold block mb-2 text-sm">Price</label>
                            <input type="text" name="price" id="price" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" placeholder='1.50'
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {/* Category, Restaurant Name and Food Image */}
                    <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
                        <div className='w-full md:w-1/3'>
                            <label htmlFor="category" className="font-semibold block mb-2 text-sm">Category</label>
                            <select
                                className='w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none'
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
                        <div className='w-full md:w-1/3'>
                            <label htmlFor="restrauName" className="font-semibold block mb-2 text-sm">Restaurant Name</label>
                            <select
                                className='w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none'
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
                        <div className='w-full md:w-1/3'>
                            <label htmlFor="foodImage" className="font-semibold text-sm">Image</label>
                            <input type="file" name="foodImage" id="foodImage" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="font-semibold text-sm">Description</label>
                        <textarea name="description" id="description" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
                {
                    error &&
                    <div className="text-red-500 text-lg">
                        {error}
                    </div>
                }
                <div className="space-y-2">
                    <div>
                        <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">{loading ? <Processing title={'Processing'} /> : 'Add Food'}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddFood;