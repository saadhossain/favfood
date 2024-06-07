'use client';
import { DataContext } from '@/app/context/DataContext';
import { setTabQuery } from '@/app/lib/features/foodSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { DataContextType } from '@/app/types/DataContextTypes';
import { useContext } from 'react';
import { BiSolidDish, BiSolidOffer } from "react-icons/bi";
import { FaAward, FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFiberNew } from "react-icons/md";
import DisplayFoodData from './DisplayFoodData';
const HorizontalTab = () => {
    //Get the necessary states from the context
    const { loading } = useContext(DataContext) as DataContextType;

    const dispatch = useAppDispatch();
    const { tabQuery } = useAppSelector((state) => state.food);

    const tabStyle = 'hover:text-primary border-b-4 hover:border-primary pb-2 duration-200 ease-in-out flex items-center gap-1 cursor-pointer min-w-36';
    return (
        <div className='mt-3 md:mt-12 min-h-[350px] relative'>
            <ul className='flex gap-2 items-center justify-between overflow-x-auto'>
                <li className={`${tabStyle} ${tabQuery === 'all-food' ? 'text-primary border-primary' : 'text-black border-gray-100'}`} onClick={() => dispatch(setTabQuery('all-food'))}><BiSolidDish className='w-5 h-5' />All Food</li>
                <li className={`${tabStyle} ${tabQuery === 'promotions' ? 'text-primary border-primary' : 'text-black border-gray-100'}`} onClick={() => dispatch(setTabQuery('promotions'))}><BiSolidOffer className='w-5 h-5' />Promotions</li>
                <li className={`${tabStyle} ${tabQuery === 'newcomers' ? 'text-primary border-primary' : 'text-black border-gray-100'}`} onClick={() => dispatch(setTabQuery('newcomers'))}><MdFiberNew className='w-5 h-5' />Newcomers</li>
                <li className={`${tabStyle} ${tabQuery === 'best-seller' ? 'text-primary border-primary' : 'text-black border-gray-100'}`} onClick={() => dispatch(setTabQuery('best-seller'))}><FaAward className='w-5 h-5' />Best Sellers</li>
                <li className={`${tabStyle} ${tabQuery === 'top-rated' ? 'text-primary border-primary' : 'text-black border-gray-100'}`} onClick={() => dispatch(setTabQuery('top-rated'))}><FaStar className='w-5 h-5' />Top Rated</li>
            </ul>
            <hr className='border-b-4 border-gray-100 -mt-1' />
            <DisplayFoodData tabQuery={tabQuery} loading={loading} />

            {/* Arrow Buttons */}
            <div className='w-full flex justify-between absolute top-0 -z-50 text-primary md:hidden'>
                <IoIosArrowBack className='-ml-5 h-6 w-6' />
                <IoIosArrowForward className='-mr-5 h-6 w-6' />
            </div>
        </div>
    );
};

export default HorizontalTab;