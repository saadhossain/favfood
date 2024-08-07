'use client'
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner';
import Processing from '@/app/components/spinner/Processing';
import { DataContext } from '@/app/context/DataContext';
import { useHandleInputChange } from '@/app/hooks/useHandleInputChange';
import { DataContextType } from '@/app/types/DataContextTypes';
import { updateData } from '@/app/utils/updateData';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";

const UserProfile = () => {
    const { loading, setLoading, formData } = useContext(DataContext) as DataContextType;
    const { data: session } = useSession();
    const [isEditable, setIsEditable] = useState(false);
    //Handle Input Change for Update or Add New Data.
    const handleInputChange = useHandleInputChange();
    const handleEditProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        //Call the updateUserProfile function
        const data = await updateData(`/users?userId=${session?.user._id}`, formData);
        if (data.acknowledged) {
            toast.success('Profile updated successfully');
            setLoading(false);
        }
    }
    return (
        <div>
            {
                !session ? <LoadingSpinner /> : <div className='md:flex gap-5 items-center'>
                    <div className='w-full md:w-2/5 flex flex-col items-center justify-center'>
                        <Image src={session?.user.image} alt={session?.user.fullName} width={160} height={160} className='rounded-3xl w-40 h-40' />
                        <h4 className='text-lg font-semibold'>{session?.user.fullName}</h4>
                    </div>
                    <form
                        onSubmit={handleEditProfile}
                        className="w-full md:w-3/5">
                        <div className='flex justify-end'>
                            <FaEdit onClick={() => setIsEditable(!isEditable)} className='cursor-pointer w-5 h-5 hover:text-primary' />
                        </div>
                        <div className=' mb-3'>
                            <label htmlFor="fullName" className="block text-sm font-semibold">Full Name</label>
                            <input type="text" name="fullName" id="fullName"
                                defaultValue={session?.user.fullName}
                                className={`w-full px-3 py-2 rounded-md ${isEditable ? 'bg-gray-300' : 'bg-gray-400'} text-gray-900 focus:outline-none`}
                                disabled={!isEditable}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email" className="block text-sm font-semibold">Email Address</label>
                            <input type="email" name="email" id="email"
                                value={session?.user.email && session?.user.email}
                                className='w-full px-3 py-2 rounded-md bg-gray-400 text-gray-900'
                                disabled
                                title='Email is not Editable'
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="phone" className="block text-sm font-semibold">Phone</label>
                            <input type="tel" name="phone" id="phone"
                                defaultValue={session?.user?.phone && session?.user?.phone}
                                className={`w-full px-3 py-2 rounded-md ${isEditable ? 'bg-gray-300' : 'bg-gray-400'} text-gray-900 focus:outline-none`}
                                disabled={!isEditable}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='w-full flex items-center justify-between mb-3 font-semibold border-b-2 border-gray-200 pb-2'>
                            <p>Role</p>
                            <p className='capitalize'>{session?.user.role}</p>
                        </div>
                        <div className='w-full flex items-center justify-between mb-3 font-semibold'>
                            <p>Status</p>
                            <p className={`${session?.user.isActive ? 'text-green-600' : 'text-red-600'}`}>{session?.user?.isActive ? 'Verified' : 'Unverified'}</p>
                        </div>
                        <button type="submit"
                            disabled={!isEditable}
                            className={`w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md ${isEditable ? 'bg-primary' : 'bg-gray-400'} text-white`}>
                            {loading ? <Processing title={'Processing'} /> : 'Edit Profile'}
                        </button>
                    </form>
                </div>
            }
        </div>
    )
}

export default UserProfile