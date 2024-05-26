'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus, FaSignOutAlt } from "react-icons/fa";

interface Props {
    isExpand: boolean;
    setIsExpand: Dispatch<SetStateAction<boolean>>;
}

const MobileMenus = ({ isExpand, setIsExpand }: Props) => {
    const { data: session } = useSession();
    const route = useRouter();
    const handleSignout = async () => {
        await signOut();
        toast.success('You are logged out.');
        setIsExpand(false);
        route.push('/');
    };
    const currentPath = usePathname();
    const [isSettingsOpen, setIsSettingsOpen] = useState(true);

    const getLinkClasses = (path: string) => (
        `hover:bg-primary hover:text-white py-1 px-2 ${currentPath === path && 'bg-primary text-white'}`
    );

    return (
        <nav className={`w-full min-h-[62vh] bg-gray-100 p-4 rounded-md flex flex-col justify-between absolute top-14 right-0 ${!isExpand && 'hidden'}`}>
            <ul className='flex flex-col gap-1'>
                {
                    session?.user.role === 'admin'
                        ? <>
                            <li className={getLinkClasses('/admin/dashboard')}
                                onClick={() => setIsExpand(!isExpand)}
                            >
                                <Link href='/admin/dashboard'>Dashboard</Link>
                            </li>
                            <li className={getLinkClasses('/admin/dashboard/orders')}
                                onClick={() => setIsExpand(!isExpand)}
                            >
                                <Link href='/admin/dashboard/orders'>All Orders</Link>
                            </li>
                            <li className={getLinkClasses('/admin/dashboard/users')}
                                onClick={() => setIsExpand(!isExpand)}
                            >
                                <Link href='/admin/dashboard/users'>Users</Link>
                            </li>
                            <li className={getLinkClasses('/admin/dashboard/foods')}
                                onClick={() => setIsExpand(!isExpand)}
                            >
                                <Link href='/admin/dashboard/foods'>All Foods</Link>
                            </li>
                            <li className={getLinkClasses('/admin/dashboard/reviews')}
                                onClick={() => setIsExpand(!isExpand)}
                            >
                                <Link href='/admin/dashboard/reviews'>Reviews</Link>
                            </li>
                            <li className={getLinkClasses('/admin/dashboard/restaurants')}
                                onClick={() => setIsExpand(!isExpand)}
                            >
                                <Link href='/admin/dashboard/restaurants'>Restaurants</Link>
                            </li>
                            <li className={getLinkClasses('/admin/dashboard/support')}
                                onClick={() => setIsExpand(!isExpand)}
                            >
                                <Link href='/admin/dashboard/support'>Support</Link>
                            </li>
                        </>
                        : <>
                            <li className={getLinkClasses('/account')}
                                onClick={() => setIsExpand(!isExpand)}
                            >
                                <Link href='/account'>Dashboard</Link>
                            </li>
                            <li className={getLinkClasses('/account/orders')}
                                onClick={() => setIsExpand(!isExpand)}
                            >
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
                                        {isSettingsOpen ? <FaMinus className='w-3 h-3' /> : <FaPlus className='w-3 h-3' />}
                                    </div>
                                </button>
                                <ul
                                    id="settings-submenu"
                                    className={`${isSettingsOpen ? 'block' : 'hidden'} pl-3 mt-1`}
                                >
                                    <li className={getLinkClasses('/account/settings/profile')}
                                        onClick={() => setIsExpand(!isExpand)}
                                    >
                                        <Link href='/account/settings/profile'>My Profile</Link>
                                    </li>
                                    <li className={getLinkClasses('/account/settings/payment-method')}
                                        onClick={() => setIsExpand(!isExpand)}
                                    >
                                        <Link href='/account/settings/payment-method'>Payment Method</Link>
                                    </li>
                                    <li className={getLinkClasses('/account/settings/address-book')}
                                        onClick={() => setIsExpand(!isExpand)}
                                    >
                                        <Link href='/account/settings/address-book'>Address Book</Link>
                                    </li>
                                    <li className={getLinkClasses('/account/settings/collected-vouchers')}
                                        onClick={() => setIsExpand(!isExpand)}
                                    >
                                        <Link href='/account/settings/vouchers'>Vouchers</Link>
                                    </li>
                                    <li className={getLinkClasses('/account/settings/password')}
                                        onClick={() => setIsExpand(!isExpand)}
                                    >
                                        <Link href='/account/settings/password'>Change Password</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={getLinkClasses('/account/support')}
                                onClick={() => setIsExpand(!isExpand)}
                            >
                                <Link href='/account/support'>Support</Link>
                            </li>
                        </>
                }
            </ul>
            <div
                onClick={handleSignout}
                className='flex items-center mt-3 gap-2 font-semibold text-lg cursor-pointer hover:text-primary'>
                <FaSignOutAlt className='w-6 h-6' />
                <h4>Logout</h4>
            </div>
        </nav>
    );
};

export default MobileMenus;
