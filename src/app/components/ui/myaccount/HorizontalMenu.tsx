'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaSignOutAlt } from "react-icons/fa";

const HorizontalMenu = () => {
    const route = useRouter();
    const handleSignout = async () => {
        signOut();
        toast.success('You are logged out.');
        route.push('/');
    };
    return (
        <aside className='w-3/12 min-h-[60vh] bg-gray-100 p-6 rounded-md flex flex-col justify-between'>
            <ul>
                <li><Link href='/account/profile'>My Profile</Link></li>
                <li><Link href='/account/profile'>My Orders</Link></li>
                <li><Link href='/account/profile'>My Wishlist</Link></li>
            </ul>
            <div
                onClick={handleSignout}
                className='flex items-center gap-2 font-semibold text-lg cursor-pointer'>
                <FaSignOutAlt className='w-6 h-6' />
                <h4>Signout</h4>
            </div>
        </aside>
    );
};

export default HorizontalMenu;