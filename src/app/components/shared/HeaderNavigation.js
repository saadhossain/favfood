'use client';
import HeaderSearch from '@/app/components/ui/HeaderSearch';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import FavFood from '/public/favfood-for-web.png';
const HeaderNavigation = () => {
  const activePath = usePathname();
  const navStyle = `hover:text-secondary duration-300 ease-in-out}`;

  return (
    <div className='w-full bg-gray-100'>
      <div className='w-10/12 mx-auto flex justify-between items-center'>
        <Link href='/'><Image src={FavFood} alt='Favfood' width={60} height={60} /></Link>
        <HeaderSearch />
        {/* buttons and login register */}
        <div className='flex items-center gap-2'>
          <Link href='/favourite' className={`${navStyle} ${activePath === '/favourite' ? 'text-secondary' : 'text-gray-700'}`}><FaHeart className='w-6 h-6' /></Link>
          <Link href='/cart' className={`${navStyle} ${activePath === '/cart' ? 'text-secondary' : 'text-gray-700'}`}><FaCartShopping className='w-6 h-6' /></Link>
          <div className='flex gap-2'>
            <Link href='/login' className='bg-primary text-white py-2 px-8 rounded-3xl hover:bg-secondary duration-200 ease-in'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavigation;