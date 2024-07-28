'use client';
import { DataContext } from '@/app/context/DataContext';
import { useHandleInputChange } from '@/app/hooks/useHandleInputChange';
import { setShowPassword } from '@/app/lib/features/commonFeaturesSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { DataContextType } from '@/app/types/DataContextTypes';
import { saveToDatabase } from '@/app/utils/saveToDatabase';
import { uploadImgToImgbb } from '@/app/utils/uploadImgToImgbb';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Processing from '../../spinner/Processing';

const RegisterForm = () => {
    const { loading, setLoading, formData } = useContext(DataContext) as DataContextType;
    const dispatch = useAppDispatch();
    const { showPassword } = useAppSelector((state) => state.commonFeatures)
    const { data: session } = useSession();
    const [error, setError] = useState('');
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
                signIn('credentials', {
                    email: formData.email,
                    password: formData.password,
                    redirect: false
                });
                redirect('/account');
            }
        } catch (error: any) {
            console.log(error.message);
            setLoading(false);
        }
    };
    //After registration redirect the user to account page
    if (session) {
        redirect('/account');
    };
    return (
        <form onSubmit={(e) => handleUserRegistration(e)} className="space-y-6">
            <div className="space-y-2">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                    <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="fullName" className="block mb-2 text-sm">Full Name</label>
                    <input type="text" name="fullName" id="fullName" placeholder="Leroy Jenkins" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div className='relative'>
                    <label htmlFor="password" className="text-sm">Password</label>
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
                    <label htmlFor="phone" className="text-sm">Phone Number</label>
                    <input type="text" name="phone" id="phone" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                        placeholder="+880-1XX-XXXX-XXX"

                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="profileImage" className="text-sm">Select Profile Image</label>
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
                    <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">{loading ? <Processing title={'Processing'} /> : 'Register'}</button>
                </div>
                <p className="px-6 text-sm text-center text-gray-400">Already have an account?
                    <Link href="/login" className="text-primary hover:text-secondary ml-2 text-lg font-semibold">Login</Link>.
                </p>
            </div>
        </form>
    );
};

export default RegisterForm;