'use client';
import HeaderSearch from '@/app/components/ui/HeaderSearch';
import { DataContext } from '@/app/context/DataContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import FavFood from '/public/favfood-for-web.png';
const HeaderNavigation = () => {
  const { data: session, status } = useSession();
  // console.log(status);
  console.log(session);
  const activePath = usePathname();
  const navStyle = `hover:text-secondary duration-300 ease-in-out}`;
  //Get Cart Quantity from the context api
  const { cartQuantity, wishlistQuantity } = useContext(DataContext);
  return (
    <div className='w-full bg-gray-100'>
      <div className='w-11/12 md:w-10/12 mx-auto flex justify-between items-center'>
        <Link href='/'><Image src={FavFood} alt='Favfood' width={60} height={60} /></Link>
        <HeaderSearch />
        {/* buttons and login register */}
        <div className='flex items-center gap-4'>
          <Link href='/wishlist' className={`${navStyle} ${activePath === '/favourite' ? 'text-secondary' : 'text-gray-700'}`}><FaHeart className='w-6 h-6' /><span className={`absolute top-2 bg-primary text-white px-2 py-1 rounded-full text-xs ml-3 ${wishlistQuantity <= 0 && 'hidden'}`}>{wishlistQuantity}</span></Link>
          <Link href='/cart' className={`${navStyle} ${activePath === '/cart' ? 'text-secondary' : 'text-gray-700'}`}><FaCartShopping className='w-6 h-6 relative' /><span className={`absolute top-2 bg-primary text-white px-2 py-1 rounded-full text-xs ml-3 ${cartQuantity <= 0 && 'hidden'}`}>{cartQuantity}</span></Link>
          <div className='ml-3'>
            {
              status === "authenticated" ?
                <Link href='/account'>
                  <Image src={session.user.image} alt={session.user.name} width={40} height={40} className='rounded-full' />
                </Link>
                : <Link href='/login' className='bg-primary text-white py-2 px-8 rounded-3xl hover:bg-secondary duration-200 ease-in'>Login</Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavigation;