import React from 'react';
import Image from 'next/image';
import HeroBanner from '/public/hero-banner.jpg'
import HorizontalTab from './components/ui/homecomp/HorizontalTab';
import FoodData from './components/ui/homecomp/FoodData';

const HomePage = () => {
  return (
    <div className='w-10/12 mx-auto my-10'>
      <Image src={HeroBanner} alt='Hero Banner' width={1180} className='rounded-md'/>
      <HorizontalTab/>
      <FoodData/>
    </div>
  );
};

export default HomePage;