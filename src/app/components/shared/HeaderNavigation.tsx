'use client';
import { setIsSearchModalOpen } from '@/app/lib/features/searchSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaHeart, FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoClose } from 'react-icons/io5';
import { RiMenu2Fill } from "react-icons/ri";
import MobileMenus from './MobileMenus';
import FavFood from '/public/favfood-for-web.png';

const HeaderNavigation = () => {
  const { data: session, status } = useSession() as any;
  const state = useAppSelector((state) => state);
  const cartCount = state.cart.cartCount;
  const wishlistCount = state.wishlist.wishlistCount;
  const dispatch = useAppDispatch();
  const activePath = usePathname();
  const navStyle = `hover:text-secondary duration-300 ease-in-out}`;

  const [isExpand, setIsExpand] = useState(false);
  return (
    <header className='w-full bg-gray-100 sticky top-0 z-50'>
      <div className='w-11/12 md:w-10/12 mx-auto flex justify-between items-center'>
        <Link href='/'><Image src={FavFood} alt='Favfood' width={60} height={60} /></Link>
        {/* buttons and login register */}
        <div className='flex items-center gap-4 relative'>
          <FaSearch
            className='w-6 h-6 text-gray-700 hover:text-secondary cursor-pointer duration-300'
            onClick={() => dispatch(setIsSearchModalOpen())}
          />
          <Link href='/wishlist' className={`${navStyle} ${activePath === '/favourite' ? 'text-secondary' : 'text-gray-700'}`}><FaHeart className='w-6 h-6' /><span className={`absolute top-2 bg-primary text-white px-2 py-1 rounded-full text-xs ml-3 ${wishlistCount <= 0 && 'hidden'}`}>{wishlistCount}</span></Link>
          <Link href='/cart' className={`${navStyle} ${activePath === '/cart' ? 'text-secondary' : 'text-gray-700'}`}><FaCartShopping className='w-6 h-6 relative' /><span className={`absolute top-2 bg-primary text-white px-2 py-1 rounded-full text-xs ml-3 ${cartCount <= 0 && 'hidden'}`}>{cartCount}</span></Link>
          {/* Login Button and User Image */}
          <div>
            {
              status === "authenticated" ?
                <Link href={`${session?.user?.role === 'admin' ? '/admin/dashboard' : '/account'}`}>
                  <Image src={session.user.image} alt={session.user.name} width={40} height={40} className='rounded-full max-h-10 max-w-10 w-10 h-10' />
                </Link>
                : <Link href='/login' className='bg-primary text-white py-2 px-4 md:px-8 rounded-3xl hover:bg-secondary duration-200 ease-in'>Login</Link>
            }
          </div>
          {/* Mobile Navigation */}
          {
            session && <div
              className='cursor-pointer hover:text-secondary md:hidden'
              onClick={() => setIsExpand(!isExpand)}
            >
              {
                isExpand ? <IoClose className='w-7 h-7' /> : <RiMenu2Fill className='w-7 h-7' />
              }
            </div>
          }
        </div>
      </div>
      <MobileMenus isExpand={isExpand} setIsExpand={setIsExpand} />
    </header>
  );
};

export default HeaderNavigation;