'use client'
import { DataContext } from '@/app/context/DataContext';
import { useHandleInputChange } from '@/app/hooks/useHandleInputChange';
import { DataContextType } from '@/app/types/DataContextTypes';
import { UserData } from '@/app/types/DataTypes';
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin';
import { updateData } from '@/app/utils/updateData';
import { FormEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SubHeading from '../shared/headings/SubHeading';
import Processing from '../spinner/Processing';


const EditUserModal = () => {
    const { openUserEditModal, setOpenUserEditModal, singleDataId, showPassword, setShowPassword, formData, setFormData } = useContext(DataContext) as DataContextType;
    const inputStyle = 'w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none';
    const users = fetchDataForAdmin('/api/users');

    //GEt single order
    const [singleUser, setSingleUser] = useState<UserData>();
    useEffect(() => {
        const getSingleOrder = async () => {
            const singleUser = users.find((user: UserData) => user._id === singleDataId);
            setSingleUser(singleUser);
        }
        getSingleOrder();
    }, [openUserEditModal]);
    const [isUpdating, setIsUpdating] = useState(false);
    //Handle Input Change for Update or Add New Data.
    const handleInputChange = useHandleInputChange();
    //Handle the Update User
    const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
        const form = e.target as HTMLFormElement;
        //Update the User in the database
        const data = await updateData(`/users?userId=${singleUser?._id}`, formData);
        if (data.acknowledged) {
            toast.success('User Updated Successfully.');
            form.reset();
            setIsUpdating(false);
            setOpenUserEditModal(false);
        }
    }
    return (
        <>
            {
                openUserEditModal && <div className={`w-full min-h-screen flex items-center justify-center absolute py-10 left-0 top-0 z-50 bg-gray-900 bg-opacity-60`}>
                    <div className='w-11/12 md:w-2/5  flex items-center bg-gray-700 text-white p-5 my-5 md:my-0 rounded-md relative'>
                        <button
                            onClick={() => setOpenUserEditModal(false)}
                            className='font-bold text-xl absolute top-1 right-2 bg-gray-900 bg-opacity-60 py-1 px-3 rounded-full'>X</button>
                        <form
                            onSubmit={handleUpdateUser}
                            className="w-full space-y-6"
                        >
                            {/* Order Details */}
                            <div className="space-y-4">
                                <SubHeading heading={'User Details'} />
                                <div>
                                    <label htmlFor="fullName" className="block mb-2 text-sm">User Name</label>
                                    <input type="text" name="fullName" id="fullName"
                                        className={`${inputStyle}`}
                                        defaultValue={singleUser?.fullName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm">Email Address</label>
                                    <input type="email" name="email" id="email"
                                        className={`${inputStyle}`}
                                        defaultValue={singleUser?.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm">Phone</label>
                                    <input type="text" name="phone" id="phone"
                                        className={`${inputStyle}`}
                                        defaultValue={singleUser?.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='relative'>
                                    <label htmlFor="password" className="text-sm">Password</label>
                                    <input type={`${showPassword ? 'password' : 'text'}`} name="password" id="password" placeholder="***************"
                                        className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                                        onChange={handleInputChange}
                                    />
                                    {/* Eye button for hide and show password */}
                                    <div
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='cursor-pointer absolute top-9 right-2 text-gray-900'
                                    >
                                        {
                                            showPassword ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* //Delivery Address */}
                            <div className="space-y-4">
                                <SubHeading heading={'Delivery Address'} />
                                <div>
                                    <label htmlFor="streetAddress" className="block mb-2 text-sm">Street Address</label>
                                    <input type="text" name="streetAddress" id="streetAddress"
                                        className={`${inputStyle}`}
                                        defaultValue={singleUser?.address?.streetAddress}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {/* //City and State */}
                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="city" className="block mb-2 text-sm">City</label>
                                        <input type="text" name="city" id="city"
                                            className={`${inputStyle}`}
                                            defaultValue={singleUser?.address?.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block mb-2 text-sm">State/Division</label>
                                        <input type="text" name="state" id="state"
                                            className={`${inputStyle}`}
                                            defaultValue={singleUser?.address?.state}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='w-2/4'>
                                        <label htmlFor="zipCode" className="block mb-2 text-sm">ZIP Code</label>
                                        <input type="text" name="zipCode" id="zipCode"
                                            className={`${inputStyle}`}
                                            defaultValue={singleUser?.address?.zipCode}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='w-2/4'>
                                        <label htmlFor="country" className="block mb-2 text-sm">Country</label>
                                        <p className={`${inputStyle}`}>{singleUser?.address?.country}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">
                                        {isUpdating ? <Processing title={'Processing'} /> : 'Update User'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default EditUserModal