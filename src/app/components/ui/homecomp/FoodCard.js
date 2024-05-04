import Image from 'next/image';
import Link from 'next/link';
import { FaCartShopping, FaShop, FaStar } from "react-icons/fa6";
import { MdSell } from "react-icons/md";

const FoodCard = ({ food }) => {
    return (
        <div className='bg-gray-100 border-gray-100 rounded-md h-[380px] relative'>
            <Image src={food.image} alt={food.name} width={400} height={250} className='rounded-t-md' />
            <div className='flex flex-col justify-between p-4'>
                <div className='flex items-start justify-between'>
                    <h3 className='w-9/12 text-lg font-semibold'>{food.name}</h3>
                    <Link href='/' className='w-9=3/12 flex gap-1 items-center underline hover:text-primary'><FaStar className='text-primary' />{food.reviewCount}</Link>
                </div>
                <div className='flex items-start justify-between mt-3'>
                    <Link href='/' className='font-semibold flex items-center gap-1 hover:text-secondary'><FaShop className='text-primary h-4 w-4' />{food.restaurant_Name}</Link>
                    <p className='w-9=3/12 flex gap-1 items-center'><MdSell className='text-primary' />{food.itemSold}</p>
                </div>
                <div className='w-full flex items-end absolute bottom-5'>
                    <h5 className='font-semibold text-primary'>${food.price}</h5>
                    <Link href='/' className=' flex gap-1 items-center justify-center py-2 px-5 rounded-md bg-primary text-white hover:bg-secondary duration-200 ease-in-out absolute right-7'><FaCartShopping />Order</Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;