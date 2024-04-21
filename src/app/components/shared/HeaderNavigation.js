'use client';
import HeaderSearch from '@/app/components/ui/HeaderSearch';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BiSolidDish } from "react-icons/bi";
import { FaHeart, FaHome, FaSearch } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import FavFood from '/public/favfood-for-web.png';
const HeaderNavigation = () => {
  const activePath = usePathname();
  const navStyle = `flex items-center gap-1 hover:text-secondary duration-300 ease-in-out}`;

  //Header Search bar functionality
  const [hideSearch, setHideSearch] = useState(true);
  return (
    <div className='w-full bg-lt_gray'>
      <div className='w-10/12 mx-auto flex justify-between items-center'>
        <Link href='/'><Image src={FavFood} alt='Favfood' width={60} height={60} /></Link>
        <div className='flex gap-5 items-center relative'>
          <ul className='flex gap-5 items-center'>
            <li><Link href='/' className={`${navStyle} ${activePath === '/' ? 'text-secondary' : 'text-black'}`}><FaHome />Home</Link></li>
            <li><Link href='/menus' className={`${navStyle} ${activePath === '/menus' ? 'text-secondary' : 'text-black'}`}><BiSolidDish />Menus</Link></li>
            <li><Link href='/restaurants' className={`${navStyle} ${activePath === '/restaurants' ? 'text-secondary' : 'text-black'}`}><IoFastFood />Restaurants</Link></li>
            <li><Link href='/favourite' className={`${navStyle} ${activePath === '/favourite' ? 'text-secondary' : 'text-black'}`}><FaHeart />Favourite</Link></li>
          </ul>
          <FaSearch onClick={() => setHideSearch(false)} className={`${!hideSearch && 'hidden'} text-black hover:text-secondary cursor-pointer h-5 w-5`} />
          <HeaderSearch hideSearch={hideSearch} setHideSearch={setHideSearch} />
          <Link href='/login' className='bg-primary text-white py-2 px-8 rounded-3xl hover:bg-secondary duration-200 ease-in'>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavigation;