import Link from 'next/link';
import { BiSolidDish, BiSolidOffer } from "react-icons/bi";
import { FaAward, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const HorizontalTab = () => {
    return (
        <div className='mt-12'>
            <ul className='flex gap-2 items-center justify-between'>
                <li className='text-black hover:text-secondary border-b-4 border-[#d9d9d9] hover:border-secondary pb-2 duration-200 ease-in-out'><Link href='/nearby' className='flex items-center gap-1'><FaMapMarkerAlt className='w-5 h-5' />Nearby</Link></li>
                <li className='text-black hover:text-secondary border-b-4 border-[#d9d9d9] hover:border-secondary pb-2 duration-200 ease-in-out'><Link href='/promotions' className='flex items-center gap-1'><BiSolidOffer className='w-5 h-5' />Promotions</Link></li>
                <li className='text-black hover:text-secondary border-b-4 border-[#d9d9d9] hover:border-secondary pb-2 duration-200 ease-in-out'><Link href='/newcomers' className='flex items-center gap-1'><BiSolidDish className='w-5 h-5' />Newcomers</Link></li>
                <li className='text-black hover:text-secondary border-b-4 border-[#d9d9d9] hover:border-secondary pb-2 duration-200 ease-in-out'><Link href='/newcomers' className='flex items-center gap-1'><FaAward className='w-5 h-5' />Best Sellers</Link></li>
                <li className='text-black hover:text-secondary border-b-4 border-[#d9d9d9] hover:border-secondary pb-2 duration-200 ease-in-out'><Link href='/top-rated' className='flex items-center gap-1'><FaStar className='w-5 h-5' />Top Rated</Link></li>
                <li className='text-black hover:text-secondary border-b-4 border-[#d9d9d9] hover:border-secondary pb-2 duration-200 ease-in-out'><Link href='/all-food' className='flex items-center gap-1'><MdDashboard className='w-5 h-5' />All Food</Link></li>
            </ul>
            <hr className='border-b-4 border-[#d9d9d9] -mt-1' />
        </div>
    );
};

export default HorizontalTab;