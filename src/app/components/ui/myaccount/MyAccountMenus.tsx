'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus, FaSignOutAlt } from "react-icons/fa";

const MyAccountMenus = () => {
    const route = useRouter();
    const handleSignout = async () => {
        await signOut();
        toast.success('You are logged out.');
        route.push('/');
    };
    const currentPath = usePathname();
    const [isSettingsOpen, setIsSettingsOpen] = useState(true);

    const getLinkClasses = (path:string) => (
        `hover:bg-primary hover:text-white py-1 px-2 ${currentPath === path && 'bg-primary text-white'}`
    );

    return (
        <aside className='min-h-[62vh] bg-gray-100 p-4 rounded-md flex flex-col justify-between'>
            <nav>
                <ul className='flex flex-col gap-1'>
                    <li className={getLinkClasses('/account')}>
                        <Link href='/account'>Dashboard</Link>
                    </li>
                    <li className={getLinkClasses('/account/orders')}>
                        <Link href='/account/orders'>Orders</Link>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            aria-expanded={isSettingsOpen}
                            aria-controls="settings-submenu"
                            className='w-full flex items-center justify-between py-1 px-2 hover:bg-primary hover:text-white'
                        >
                            Settings
                            <div onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                                {isSettingsOpen ? <FaMinus className='w-3 h-3'/> : <FaPlus className='w-3 h-3'/>}
                            </div>
                        </button>
                        <ul
                            id="settings-submenu"
                            className={`${isSettingsOpen ? 'block' : 'hidden'} pl-3 mt-1`}
                        >
                            <li className={getLinkClasses('/account/settings/profile')}>
                                <Link href='/account/settings/profile'>My Profile</Link>
                            </li>
                            <li className={getLinkClasses('/account/settings/payment-method')}>
                                <Link href='/account/settings/payment-method'>Payment Method</Link>
                            </li>
                            <li className={getLinkClasses('/account/settings/address-book')}>
                                <Link href='/account/settings/address-book'>Address Book</Link>
                            </li>
                            <li className={getLinkClasses('/account/settings/collected-vouchers')}>
                                <Link href='/account/settings/vouchers'>Vouchers</Link>
                            </li>
                            <li className={getLinkClasses('/account/settings/password')}>
                                <Link href='/account/settings/password'>Change Password</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={getLinkClasses('/account/support')}>
                        <Link href='/account/support'>Support</Link>
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

export default MyAccountMenus;
