'use client';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Processing from '../components/spinner/Processing';
import { DataContext } from '../context/DataContext';
import { DataContextType } from '../types/DataContextTypes';
import { saveToDatabase } from '../utils/saveToDatabase';
import { uploadImgToImgbb } from '../utils/uploadImgToImgbb';
import LoginBg from '/public/login-bg.jpg';

const RegisterPage = () => {
    const { showPassword, setShowPassword, loading, setLoading } = useContext(DataContext) as DataContextType;
    const { data: session } = useSession();
    const [error, setError] = useState('');
    //Save the User to the Database.
    const handleUserRegistration = async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email: string = form.email.value;
        const fullName: string = form.fullname.value;
        const phone: string = form.phone.value;
        const password: string = form.password.value;

        //Validations
        if (!email || !fullName || !password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        if (password.length < 10) {
            setError('Password must be at least 10 characters long');
            setLoading(false);
            return;
        }

        //Handle profile image and upload to Imgbb
        const image = form.profileImage.files[0];
        //check if image uploaded
        if (!image) {
            setError('Please upload the image, its required.');
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append('image', image);
        const profileImg = await uploadImgToImgbb(formData);

        //Arrange User data
        const userData = {
            email,
            fullName,
            password,
            profileImg,
            role: 'customer',
            isActive: true,
            phone,
            address: null
        };
        try {
            //Save user data to database
            const data = await saveToDatabase('/api/users', userData);
            if (data.status) {
                form.reset();
                setLoading(false);
                toast.success('User Registration Successful.');
                signIn('credentials', {
                    email,
                    password,
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
        <div className='w-11/12 md:w-10/12 mx-auto my-5 md:my-10 flex justify-center'>
            <Image src={LoginBg} alt='Login BG' className='rounded-l-md hidden md:block' />
            <div className="w-full flex flex-col max-w-md p-4 md:p-6 rounded-r-md bg-gray-100 text-gray-900 shadow-2xl">
                <div className="mb-2 md:mb-8 text-center">
                    <h1 className="my-2 md:my-3 text-2xl md:text-4xl font-bold text-primary">Register</h1>
                </div>
                <form onSubmit={(e) => handleUserRegistration(e)} className="space-y-6">
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="fullname" className="block mb-2 text-sm">Full Name</label>
                            <input type="text" name="fullname" id="fullname" placeholder="Leroy Jenkins" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                        </div>
                        <div className='relative'>
                            <label htmlFor="password" className="text-sm">Password</label>
                            <input type={`${showPassword ? 'password' : 'text'}`} name="password" id="password" placeholder="***************" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                            {/* Eye button for hide and show password */}
                            <div
                                onClick={() => setShowPassword(!showPassword)}
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
            </div>
        </div>
    );
};

export default RegisterPage;