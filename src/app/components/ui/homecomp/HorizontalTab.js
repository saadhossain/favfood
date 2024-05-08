'use client';
import { DataContext } from '@/app/context/DataContext';
import { useContext } from 'react';
import { BiSolidDish, BiSolidOffer } from "react-icons/bi";
import { FaAward, FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFiberNew } from "react-icons/md";
import Slider from 'react-slick';
import FoodData from './FoodData';
const HorizontalTab = () => {
    const tabStyle = 'horizontal-tab hover:text-secondary border-b-4 hover:border-secondary pb-2 duration-200 ease-in-out cursor-pointer min-w-36';
    const { tabQuery, setTabQuery, loading } = useContext(DataContext);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll:5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 5,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 5
                }
            }
        ]
    };
    return (
        <div className='mt-3 md:mt-12 min-h-[350px] relative slider-container'>
            <Slider {...settings}>
                <div className={`${tabStyle} ${tabQuery === 'all-food' ? 'text-secondary border-secondary' : 'text-black border-gray-100'}`} onClick={() => setTabQuery('all-food')}><BiSolidDish className='w-5 h-5' />All Food</div>
                <div className={`${tabStyle} ${tabQuery === 'promotions' ? 'text-secondary border-secondary' : 'text-black border-gray-100'}`} onClick={() => setTabQuery('promotions')}><BiSolidOffer className='w-5 h-5' />Promotions</div>
                <div className={`${tabStyle} ${tabQuery === 'newcomers' ? 'text-secondary border-secondary' : 'text-black border-gray-100'}`} onClick={() => setTabQuery('newcomers')}><MdFiberNew className='w-5 h-5' />Newcomers</div>
                <div className={`${tabStyle} ${tabQuery === 'best-seller' ? 'text-secondary border-secondary' : 'text-black border-gray-100'}`} onClick={() => setTabQuery('best-seller')}><FaAward className='w-5 h-5' />Best Seller</div>
                <div className={`${tabStyle} ${tabQuery === 'top-rated' ? 'text-secondary border-secondary' : 'text-black border-gray-100'}`} onClick={() => setTabQuery('top-rated')}><FaStar className='w-5 h-5' />Top Rated</div>
            </Slider>
            <hr className='border-b-4 border-gray-100 -mt-1' />
            <FoodData tabQuery={tabQuery} loading={loading} />

            {/* Arrow Buttons */}
            <div className='w-full justify-between absolute top-0 -z-50 text-primary hidden'>
                <IoIosArrowBack className='-ml-5 h-6 w-6' />
                <IoIosArrowForward className='-mr-5 h-6 w-6' />
            </div>
        </div>
    );
};

export default HorizontalTab;