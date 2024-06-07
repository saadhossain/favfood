'use client';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import Processing from '@/app/components/spinner/Processing';
import { DataContext } from '@/app/context/DataContext';
import { useHandleInputChange } from '@/app/hooks/useHandleInputChange';
import { useGetDataQuery } from '@/app/lib/features/api/apiSlice';
import { setShowPassword } from '@/app/lib/features/commonFeaturesSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { DataContextType } from '@/app/types/DataContextTypes';
import { saveToDatabase } from '@/app/utils/saveToDatabase';
import { uploadImgToImgbb } from '@/app/utils/uploadImgToImgbb';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AddUser = () => {
    const { loading, setLoading, formData } = useContext(DataContext) as DataContextType;
    const [error, setError] = useState('');
    const route = useRouter();

    //Get the user refetch function from redux to update list after add new user
    const { refetch } = useGetDataQuery('/users')
    const dispatch = useAppDispatch();
    const { showPassword } = useAppSelector((state) => state.commonFeatures)

    //Get the useHandleInputChange hook to get all the input
    const handleInputChange = useHandleInputChange();
    //Save the User to the Database.
    const handleUserRegistration = async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        //Validations
        if (!formData.email || !formData.fullName || !formData.password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        if (formData.password.length < 10) {
            setError('Password must be at least 10 characters long');
            setLoading(false);
            return;
        }

        //Handle profile image and upload to Imgbb
        const imageInput = form.profileImage.files[0];
        //check if image uploaded
        if (!imageInput) {
            setError('Please upload the image, its required.');
            setLoading(false);
            return;
        }
        const imageFormData = new FormData();
        imageFormData.append('image', imageInput);
        const profileImg = await uploadImgToImgbb(imageFormData);

        //Arrange User data
        const userData = {
            ...formData,
            profileImg,
            role: 'customer',
            isActive: true,
            address: null
        };
        try {
            //Save user data to database
            const data = await saveToDatabase('/api/users', userData);
            if (data.status) {
                form.reset();
                setLoading(false);
                toast.success('New User Added Successfully.');
                route.push('/admin/dashboard/users');
                refetch();
            }
        } catch (error: any) {
            console.log(error.message);
            setLoading(false);
        }
    };
    return (
        <div>
            <SubHeading heading={'Add New User'} />
            <form onSubmit={(e) => handleUserRegistration(e)} className="space-y-6">
                <div className="space-y-2">
                    <div>
                        <label htmlFor="email" className="font-semibold block mb-2 text-sm">Email address</label>
                        <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="fullName" className="font-semibold block mb-2 text-sm">Full Name</label>
                        <input type="text" name="fullName" id="fullName" placeholder="Leroy Jenkins" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='relative'>
                        <label htmlFor="password" className="font-semibold text-sm">Password</label>
                        <input type={`${showPassword ? 'password' : 'text'}`} name="password" id="password" placeholder="***************" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                            required
                            onChange={handleInputChange}
                        />
                        {/* Eye button for hide and show password */}
                        <div
                            onClick={() => dispatch(setShowPassword())}
                            className='cursor-pointer absolute top-9 right-2'
                        >
                            {
                                showPassword ? <FaEye /> : <FaEyeSlash />
                            }
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone" className="font-semibold text-sm">Phone Number</label>
                        <input type="text" name="phone" id="phone" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                            placeholder="+880-1XX-XXXX-XXX"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="profileImage" className="font-semibold text-sm">Select Profile Image</label>
                        <input type="file" name="profileImage" id="profileImage" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
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
                        <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">{loading ? <Processing title={'Processing'} /> : 'Add User'}</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddUser;