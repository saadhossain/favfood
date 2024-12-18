import Link from 'next/link';
import { BiSolidDish, BiSolidOffer } from "react-icons/bi";
import { FaAward, FaStar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFiberNew } from 'react-icons/md';
import DisplayFoodData from './DisplayFoodData';
const HorizontalTab = ({ searchParams }: { searchParams: { category: string | undefined } }) => {
    const category = searchParams.category || 'all-food'

    //Styles for the tab menu
    const tabStyle = 'hover:text-primary border-b-4 hover:border-primary pb-2 duration-200 ease-in-out flex items-center gap-1 cursor-pointer min-w-36';
    return (
        <div className='mt-3 md:mt-12 min-h-[350px] relative'>
            <ul className='flex gap-2 items-center justify-between overflow-x-auto'>
                <Link
                    href={'?category=all-food'}
                    className={`${tabStyle} ${category === 'all-food' ? 'text-primary border-primary' : 'text-black border-gray-100'}`}
                ><BiSolidDish className='w-5 h-5' />All Food</Link>
                <Link
                    href={'?category=promotions'}
                    className={`${tabStyle} ${category === 'promotions' ? 'text-primary border-primary' : 'text-black border-gray-100'}`}
                ><BiSolidOffer className='w-5 h-5' />Promotions</Link>
                <Link
                    href={'?category=newcomers'}
                    className={`${tabStyle} ${category === 'newcomers' ? 'text-primary border-primary' : 'text-black border-gray-100'}`}
                ><MdFiberNew className='w-5 h-5' />Newcomers</Link>
                <Link
                    href={'?category=best-seller'}
                    className={`${tabStyle} ${category === 'best-seller' ? 'text-primary border-primary' : 'text-black border-gray-100'}`}
                ><FaAward className='w-5 h-5' />Best Sellers</Link>
                <Link
                    href={'?category=top-rated'}
                    className={`${tabStyle} ${category === 'top-rated' ? 'text-primary border-primary' : 'text-black border-gray-100'}`}
                ><FaStar className='w-5 h-5' />Top Rated</Link>
            </ul>
            <hr className='border-b-4 border-gray-100 -mt-1' />
            <DisplayFoodData searchParams={searchParams} />

            {/* Arrow Buttons */}
            <div className='w-full flex justify-between absolute top-0 -z-50 text-primary md:hidden'>
                <IoIosArrowBack className='-ml-5 h-6 w-6' />
                <IoIosArrowForward className='-mr-5 h-6 w-6' />
            </div>
        </div>
    );
};

export default HorizontalTab;