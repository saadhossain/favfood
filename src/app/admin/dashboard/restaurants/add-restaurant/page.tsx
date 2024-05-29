'use client';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import Processing from '@/app/components/spinner/Processing';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { saveToDatabase } from '@/app/utils/saveToDatabase';
import { uploadImgToImgbb } from '@/app/utils/uploadImgToImgbb';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Select from "react-select";
interface categoryProps {
    value: string; label: string,
}

const AddRestaurant = () => {
    const { loading, setLoading } = useContext(DataContext) as DataContextType;
    const [error, setError] = useState('');
    const route = useRouter();
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

    const handleAddRestaurant = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const name = form.restaurantName.value;
        const minOrderAmount = form.minOrderAmount.value;
        const deliveryCharge = form.deliveryCharge.value;

        // Validations
        if (!name || !minOrderAmount || !deliveryCharge || selectedCategories.length === 0) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }
        // Handle profile image and upload to Imgbb
        const image = form.profileImage.files[0];
        // Check if image uploaded
        if (!image) {
            setError('Please upload the image, it\'s required.');
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append('image', image);
        const profileImage = await uploadImgToImgbb(formData);
        const foodCategory = selectedCategories.map((item: any) => item.value);
        // Arrange Restaurant Data to Save to Database
        const restaurantData = {
            name,
            foodCategory,
            minOrderAmount,
            location: "",
            deliveryCharge,
            profileImage,
            offers: null,
            isActive: true,
        }
        try {
            const data = await saveToDatabase('/api/restaurants', restaurantData);
            if (data.status) {
                form.reset();
                setLoading(false);
                toast.success('Restaurant added successfully.');
                route.push('/admin/dashboard/restaurants');
            }
        } catch (error: any) {
            console.log(error.message);
            setLoading(false);
        }
    }
    return (
        <div>
            <SubHeading heading={'Add New Restaurant'} />
            <form
                onSubmit={(e) => handleAddRestaurant(e)}
                className="space-y-6">
                <div className="space-y-2">
                    <div className='flex gap-2 items-center justify-between'>
                        <div className='w-3/5'>
                            <label htmlFor="restaurantName" className="block mb=2 text-sm">Restaurant Name</label>
                            <input type="text" name="restaurantName" id="restaurantName" placeholder="eg: KFC" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                        </div>
                        <div className='w-2/5'>
                            <label htmlFor="profileImage" className="text-sm">Select Profile Image</label>
                            <input type="file" name="profileImage" id="profileImage" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-1/5'>
                            <label htmlFor="minOrderAmount" className="block mb-2 text-sm">Min Order Amount</label>
                            <input type="text" name="minOrderAmount" id="minOrderAmount" placeholder="eg: 1" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                        </div>
                        <div className='w-1/5'>
                            <label htmlFor="deliveryCharge" className="text-sm">Delivery Charge</label>
                            <input type="text" name="deliveryCharge" id="deliveryCharge" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                                placeholder="eg: Free"
                            />
                        </div>
                        <div className='w-3/5'>
                            <label htmlFor="category" className="text-sm">Select Categories</label>
                            <Select
                                options={categories}
                                onChange={handleChange}
                                value={selectedCategories}
                                isMulti
                            />
                        </div>
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
                        <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">
                            {loading ? <Processing title={'Processing'} /> : 'Add Restaurant'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddRestaurant;
