'use client';
import { DataContext } from '@/app/context/DataContext';
import { useContext } from 'react';
import { BiSolidDish, BiSolidOffer } from "react-icons/bi";
import { FaAward, FaStar } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import FoodData from './FoodData';
const HorizontalTab = () => {
    const tabStyle = 'hover:text-secondary border-b-4 hover:border-secondary pb-2 duration-200 ease-in-out flex items-center gap-1 cursor-pointer';
    const { tabQuery, setTabQuery, loading, setLoading } = useContext(DataContext);

    // console.log(tabQuery);
    return (
        <div className='mt-12 min-h-[350px]'>
            <ul className='flex gap-2 items-center justify-between'>
                <li className={`${tabStyle} ${tabQuery === 'all-food' ? 'text-secondary border-secondary' : 'text-black border-[#d9d9d9]'}`} onClick={() => setTabQuery('all-food')}><MdDashboard className='w-5 h-5' />All Food</li>
                <li className={`${tabStyle} ${tabQuery === 'promotions' ? 'text-secondary border-secondary' : 'text-black border-[#d9d9d9]'}`} onClick={() => setTabQuery('promotions')}><BiSolidOffer className='w-5 h-5' />Promotions</li>
                <li className={`${tabStyle} ${tabQuery === 'newcomers' ? 'text-secondary border-secondary' : 'text-black border-[#d9d9d9]'}`} onClick={() => setTabQuery('newcomers')}><BiSolidDish className='w-5 h-5' />Newcomers</li>
                <li className={`${tabStyle} ${tabQuery === 'best-seller' ? 'text-secondary border-secondary' : 'text-black border-[#d9d9d9]'}`} onClick={() => setTabQuery('best-seller')}><FaAward className='w-5 h-5' />Best Sellers</li>
                <li className={`${tabStyle} ${tabQuery === 'top-rated' ? 'text-secondary border-secondary' : 'text-black border-[#d9d9d9]'}`} onClick={() => setTabQuery('top-rated')}><FaStar className='w-5 h-5' />Top Rated</li>
            </ul>
            <hr className='border-b-4 border-[#d9d9d9] -mt-1' />
            <FoodData tabQuery={tabQuery} loading={loading}/>
        </div>
    );
};

export default HorizontalTab;