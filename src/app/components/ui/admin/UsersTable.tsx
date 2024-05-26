import { UserData } from '@/app/types/DataTypes';
import { updateUserProfile } from '@/app/utils/updateUserProfile';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaToggleOff, FaToggleOn, FaUserEdit } from 'react-icons/fa';
import { TiDelete } from "react-icons/ti";

interface Props {
    users: UserData[]
}

const UsersTable = ({ users }: Props) => {
    const handleDeleteUser = async (userId: string) => {
        const isConfirmed = window.confirm('Do you want to Delete this User?');
        if (isConfirmed) {
            const res = await fetch(`/api/users?userId=${userId}`, {
                method: 'DELETE'
            });
            const { result } = await res.json();
            if (result.acknowledged) {
                toast.success('User Deleted Successfully.');
            }
        }
    }
    const handleUserStatusChange = async (userId: string, currentStatus: boolean | undefined) => {
        const data = await updateUserProfile(userId, { isActive: !currentStatus });
        if (data.acknowledged) {
            toast.success('User Status Changed Successfully.');
        }
    }
    return (
        <div className='w-full'>
            {
                users?.length <= 0 ? <h1 className='text-lg font-semibold text-gray-800'>No Order Found. <Link href='/' className='text-primary'>Go to Shop</Link></h1> : (
                    <div className={`container py-2 mx-auto sm:py-4 text-gray-900 ${users?.length <= 0 && 'hidden'}`}>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <colgroup>
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                </colgroup>
                                <thead className="bg-gray-300">
                                    <tr className="text-center">
                                        {/* Product Remove Button */}
                                        <th className="p-3 text-left">Image, Name & Email</th>
                                        <th className="md:p-3 px-24">Phone</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Role</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users?.map((user: UserData) => <tr
                                            key={user._id}
                                            className="text-center border-b-2 border-gray-200">
                                            {/* Product Image and product name */}
                                            <th className="md:p-3 p-2 flex gap-2 items-center">
                                                <Image src={user.profileImg} alt={user.fullName} width={60} height={60} className='rounded-md max-h-16' />
                                                <div className='text-left'>
                                                    <p>{user.fullName}</p>
                                                    <p>{user.email}</p>
                                                </div>
                                            </th>
                                            <th className="p-3 capitalize">{user.phone ? user.phone : 'Not Found'}</th>
                                            <th className="p-3">
                                                <div className='flex items-center gap-1'>
                                                    <p>{user.isActive ? 'Active' : 'Inactive'}</p>
                                                    <div
                                                        onClick={() => handleUserStatusChange(user._id, user.isActive)}
                                                        className={`cursor-pointer ${user.role === 'admin' && 'hidden'}`}
                                                    >
                                                        {
                                                            user.isActive ? <FaToggleOn className='w-6 h-6 text-green-600' /> : <FaToggleOff className='w-6 h-6 text-red-500' />
                                                        }
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="p-3 capitalize">{user.role}</th>
                                            {/* Product Action Buttons */}
                                            <th className="p-3">
                                                <div className='flex gap-1 items-center justify-center'>
                                                    <TiDelete
                                                        onClick={() => handleDeleteUser(user._id)}
                                                        className='w-8 h-8 cursor-pointer text-red-500' title='Delete User'
                                                    />
                                                    <FaUserEdit
                                                        className='w-6 h-6 cursor-pointer text-green-600' title='Edit User'
                                                    />
                                                </div>
                                            </th>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default UsersTable;