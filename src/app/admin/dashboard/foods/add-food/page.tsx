'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading';
import Processing from '@/app/components/spinner/Processing';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin';
import { saveToDatabase } from '@/app/utils/saveToDatabase';
import { uploadImgToImgbb } from '@/app/utils/uploadImgToImgbb';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const AddFood = () => {
    const { setLoading, loading } = useContext(DataContext) as DataContextType;
    const [error, setError] = useState('');
    const restaurants = fetchDataForAdmin('/api/restaurants');
    const categories = ["Burger", "Pizza", "Sandwich", "Fries", "Chicken"];
    //Set the selected Restaurant to the state
    const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
    //Set the selected Restaurant to the state
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const route = useRouter();

    const handleAddFood = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const foodName = form.foodName.value;
        const foodPrice = form.foodPrice.value;
        const description = form.description.value;

        //Validations
        if (!foodName || !foodPrice || !description || !selectedRestaurant || !selectedCategory) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }
        //Handle profile image and upload to Imgbb
        const image = form.foodImage.files[0];
        //check if image uploaded
        if (!image) {
            setError('Please upload the image, its required.');
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append('image', image);
        const foodImage = await uploadImgToImgbb(formData);

        //Arrange Food data for saving
        const foodData = {
            name: foodName,
            description,
            price: parseFloat(foodPrice),
            restaurant_Name: selectedRestaurant,
            image: foodImage,
            category: selectedCategory,
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
            }
        } catch (error: any) {
            console.log(error.message);
            setLoading(false);
        }
    }
    return (
        <div>
            <SubHeading heading={'Create Order'} />
            {/* Create New Order */}
            <form
                onSubmit={(e) => handleAddFood(e)}
                className="space-y-6">
                <div className="space-y-2 ">
                    {/* Name and Price */}
                    <div className='flex gap-2 items-center justify-between'>
                        <div className='w-4/5'>
                            <label htmlFor="foodName" className="font-semibold block mb-2 text-sm">Product Name</label>
                            <input type="text" name="foodName" id="foodName" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                        </div>
                        <div className='w-1/5'>
                            <label htmlFor="foodPrice" className="font-semibold block mb-2 text-sm">Price</label>
                            <input type="text" name="foodPrice" id="foodPrice" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" placeholder='1.50' />
                        </div>
                    </div>
                    {/* Category, Restaurant Name and Food Image */}
                    <div className='flex gap-2 items-center justify-between'>
                        <div className='w-1/3'>
                            <label htmlFor="category" className="font-semibold block mb-2 text-sm">Category</label>
                            <select
                                className='w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none'
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
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
                        <div className='w-1/3'>
                            <label htmlFor="restrauName" className="font-semibold block mb-2 text-sm">Restaurant Name</label>
                            <select
                                className='w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none'
                                value={selectedRestaurant}
                                onChange={(e) => setSelectedRestaurant(e.target.value)}
                                name="restaurant"
                                id="restaurant"
                            >
                                <option value="">Select a Restaurant</option>
                                {
                                    restaurants.map((restaurant: any) => <option
                                        key={restaurant._id}
                                        value={restaurant.name}
                                    >{restaurant.name}</option>)
                                }
                            </select>
                        </div>
                        <div className='w-1/3'>
                            <label htmlFor="foodImage" className="font-semibold text-sm">Image</label>
                            <input type="file" name="foodImage" id="foodImage" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="font-semibold text-sm">Description</label>
                        <textarea name="description" id="description" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"></textarea>
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