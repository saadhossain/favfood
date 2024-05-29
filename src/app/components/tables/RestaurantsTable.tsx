'use client'
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { TbEdit } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";

interface Props {
    restaurants: any[]
}

const RestaurantsTable = ({ restaurants }: Props) => {
    const handleDeleteRestaurant = async (restaurantId: string) => {
        const isConfirmed = window.confirm('Do you want to Delete this Restaurant?');
        if (isConfirmed) {
            const res = await fetch(`/api/restaurants?id=${restaurantId}`, {
                method: 'DELETE'
            });
            const { result } = await res.json();
            if (result.acknowledged) {
                toast.success('Restaurant Deleted Successfully.');
            }
        }
    }

    const handleRestaurantStatusChange = async (id: string, currentStatus: boolean) => {
        const res = await fetch(`/api/restaurants?id=${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ isActive: !currentStatus })
        });
        const { result } = await res.json();
        if (result.acknowledged) {
            toast.success('Restaurant Status Changed Successfully.');
        }
    }

    return (
        <div className='w-full'>
            {
                restaurants?.length <= 0 ? <h1 className='text-lg font-semibold text-gray-800'>No Restaurant Found. <Link href='/' className='text-primary'>Go to Shop</Link></h1> : (
                    <div className={`container py-2 mx-auto sm:py-4 text-gray-900 ${restaurants?.length <= 0 && 'hidden'}`}>
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
                                        <th className="p-3 text-left">Name & Logo</th>
                                        <th className="md:p-3">Min Order</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Category</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        restaurants?.map((restaurant: any) => <tr
                                            key={restaurant._id}
                                            className="text-center border-b-2 border-gray-200">
                                            {/* Product Image and product name */}
                                            <th className="md:p-3 p-2">
                                                <div className='md:flex gap-2 items-center min-w-32 md:min-w-0 text-left'>
                                                    <Image src={restaurant.profileImage} alt={restaurant.name} width={60} height={60} className='rounded-md max-h-16' />
                                                    <p className='capitalize mt-1 md:mt-0'>{restaurant.name}</p>
                                                </div>
                                            </th>
                                            <th className="md:p-3 p-2">
                                                <p className='w-20'>${restaurant.minOrderAmount}</p>
                                            </th>
                                            <th className="md:p-3 p-2">
                                                <div className='flex items-center gap-1'>
                                                    <p>{restaurant.isActive ? 'Active' : 'Inactive'}</p>
                                                    <div
                                                        onClick={() => handleRestaurantStatusChange(restaurant._id, restaurant.isActive)}
                                                        className='cursor-pointer'
                                                    >
                                                        {
                                                            restaurant.isActive ? <FaToggleOn className='w-6 h-6 text-green-600' /> : <FaToggleOff className='w-6 h-6 text-red-500' />
                                                        }
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="md:p-3 p-2">
                                                <div className='grid grid-cols-2 md:grid-cols-3 font-normal min-w-40 md:min-w-0'>
                                                    {
                                                        restaurant?.foodCategory?.map((category: string) => <p>{category}</p>)
                                                    }
                                                </div>
                                            </th>
                                            {/* Restaurant Action Buttons */}
                                            <th className="p-3">
                                                <div className='flex gap-1 items-center justify-center'>
                                                    <TiDelete
                                                        onClick={() => handleDeleteRestaurant(restaurant._id)}
                                                        className='w-8 h-8 cursor-pointer text-red-500' title='Delete Restaurant'
                                                    />
                                                    <TbEdit
                                                        className='w-6 h-6 cursor-pointer text-green-600' title='Edit Restaurant'
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

export default RestaurantsTable;