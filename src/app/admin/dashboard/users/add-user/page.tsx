'use client';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import Processing from '@/app/components/spinner/Processing';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { uploadImgToImgbb } from '@/app/utils/uploadImgToImgbb';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AddUser = () => {
    const { showPassword, setShowPassword, loading, setLoading } = useContext(DataContext) as DataContextType;
    const [error, setError] = useState('');
    const route = useRouter();

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
            const res = await fetch(`/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await res.json();
            if (data.status) {
                form.reset();
                setLoading(false);
                toast.success('User Registration Successful.');
                route.push('/admin/dashboard/users');
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
                        <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                    </div>
                    <div>
                        <label htmlFor="fullname" className="font-semibold block mb-2 text-sm">Full Name</label>
                        <input type="text" name="fullname" id="fullname" placeholder="Leroy Jenkins" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                    </div>
                    <div className='relative'>
                        <label htmlFor="password" className="font-semibold text-sm">Password</label>
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
                        <label htmlFor="phone" className="font-semibold text-sm">Phone Number</label>
                        <input type="text" name="phone" id="phone" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                            placeholder="+880-1XX-XXXX-XXX"
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