'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { FaHeart, FaHome, FaSearch } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import { IoFastFood } from "react-icons/io5";
import FavFood from '/public/favfood-for-web.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeaderSearch from '@/app/components/ui/HeaderSearch';
const HeaderNavigation = () => {
  const activePath = usePathname();
  const navStyle = `flex items-center gap-1 hover:text-secondary duration-300 ease-in-out}`;

  //Header Search bar functionality
  const [hideSearch, setHideSearch] = useState(true);
  return (
    <div className='w-full bg-lt_gray'>
      <div className='w-10/12 mx-auto flex justify-between items-center'>
        <Image src={FavFood} alt='Favfood' width={60} height={60} />
        <ul className='flex gap-5 items-center relative'>
          <li><Link href='/' className={`${navStyle} ${activePath === '/' ? 'text-secondary':'text-black'}`}><FaHome />Home</Link></li>
          <li><Link href='/menus' className={`${navStyle} ${activePath === '/menus' ? 'text-secondary':'text-black'}`}><BiSolidDish />Menus</Link></li>
          <li><Link href='/restaurants' className={`${navStyle} ${activePath === '/restaurants' ? 'text-secondary':'text-black'}`}><IoFastFood />Restaurants</Link></li>
          <li><Link href='/favourite' className={`${navStyle} ${activePath === '/favourite' ? 'text-secondary':'text-black'}`}><FaHeart />Favourite</Link></li>
          <FaSearch onClick={()=> setHideSearch(false)} className={`${!hideSearch && 'hidden'} text-black`}/>
          <HeaderSearch hideSearch={hideSearch} setHideSearch={setHideSearch}/>
        </ul>
      </div>
    </div>
  );
};

export default HeaderNavigation;