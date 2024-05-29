import { FoodData } from '@/app/types/DataTypes';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { TbEdit } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";

interface Props {
    foods: FoodData[]
}

const FoodsTable = ({ foods }: Props) => {
    const handleDeleteFood = async (foodId: string) => {
        const isConfirmed = window.confirm('Do you want to Delete this Food?');
        if (isConfirmed) {
            const res = await fetch(`/api/foods?foodId=${foodId}`, {
                method: 'DELETE'
            });
            const { result } = await res.json();
            if (result.acknowledged) {
                toast.success('Food Deleted Successfully.');
            }
        }
    }
    return (
        <div className='w-full'>
            {
                foods?.length <= 0 ? <h1 className='text-lg font-semibold text-gray-800'>No Food Found. <Link href='/' className='text-primary'>Go to Shop</Link></h1> : (
                    <div className={`container py-2 mx-auto sm:py-4 text-gray-900 ${foods?.length <= 0 && 'hidden'}`}>
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
                                        <th className="p-3">Image, Name & Email</th>
                                        <th className="md:p-3">Price</th>
                                        <th className="p-3">Restaurant</th>
                                        <th className="p-3">Category</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        foods?.map((food: any) => <tr
                                            key={food._id}
                                            className="text-center border-b-2 border-gray-200">
                                            {/* Product Image and product name */}
                                            <th className="md:p-3 p-2">
                                                <div className='flex gap-2 items-center min-w-72 md:min-w-0'>
                                                    <Image src={food.image} alt={food.name} width={60} height={60} className='rounded-md max-h-16' />
                                                    <p>{food.name}</p>
                                                </div>
                                            </th>
                                            <th className="md:p-3 p-2">${food.price}</th>
                                            <th className="md:p-3 p-2 min-w-36 md:min-w-0">{food.restaurant_Name}</th>
                                            <th className="md:p-3 p-2">{food.category}</th>
                                            {/* Product Action Buttons */}
                                            <th className="p-3">
                                                <div className='flex gap-1 items-center justify-center'>
                                                    <TiDelete
                                                        onClick={() => handleDeleteFood(food._id)}
                                                        className='w-8 h-8 cursor-pointer text-red-500' title='Delete User'
                                                    />
                                                    <TbEdit
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

export default FoodsTable;