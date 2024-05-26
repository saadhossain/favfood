'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaSignOutAlt } from "react-icons/fa";

const AdminMenus = () => {
    const route = useRouter();
    const handleSignout = async () => {
        await signOut();
        toast.success('You are logged out.');
        route.push('/');
    };
    const currentPath = usePathname();

    const getLinkClasses = (path: string) => (
        `hover:bg-primary hover:text-white py-1 px-2 ${currentPath === path && 'bg-primary text-white'}`
    );

    return (
        <aside className='min-h-[62vh] bg-gray-100 p-4 rounded-md flex flex-col justify-between'>
            <nav>
                <ul className='flex flex-col gap-1'>
                    <li className={getLinkClasses('/admin/dashboard')}>
                        <Link href='/admin/dashboard'>Dashboard</Link>
                    </li>
                    <li className={getLinkClasses('/admin/dashboard/orders')}>
                        <Link href='/admin/dashboard/orders'>All Orders</Link>
                    </li>
                    <li className={getLinkClasses('/admin/dashboard/users')}>
                        <Link href='/admin/dashboard/users'>Users</Link>
                    </li>
                    <li className={getLinkClasses('/admin/dashboard/foods')}>
                        <Link href='/admin/dashboard/foods'>All Foods</Link>
                    </li>
                    <li className={getLinkClasses('/admin/dashboard/reviews')}>
                        <Link href='/admin/dashboard/reviews'>Reviews</Link>
                    </li>
                    <li className={getLinkClasses('/admin/dashboard/restaurants')}>
                        <Link href='/admin/dashboard/restaurants'>Restaurants</Link>
                    </li>
                    <li className={getLinkClasses('/admin/dashboard/support')}>
                        <Link href='/admin/dashboard/support'>Support</Link>
                    </li>
                </ul>
            </nav>
            <div
                onClick={handleSignout}
                className='flex items-center mt-3 gap-2 font-semibold text-lg cursor-pointer hover:text-primary'>
                <FaSignOutAlt className='w-6 h-6' />
                <h4>Logout</h4>
            </div>
        </aside>
    );
};

export default AdminMenus;
