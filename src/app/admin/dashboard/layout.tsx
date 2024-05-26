'use client'
import Heading from '@/app/components/shared/headings/Heading';
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner';
import AdminMenus from '@/app/components/ui/admin/AdminMenus';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const { data: session } = useSession();
    //If user is not authorized return error and redirect to account page.
    useEffect(() => {
        if (session && session?.user.role !== 'admin') {
            toast.error('You are not authorized to access Admin page.');
            redirect('/account');
        }
    }, [session]);
    if (!session) {
        return <LoadingSpinner />
    }
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10'>
            {
                (session && session?.user?.role === 'admin') &&
                <div className='flex gap-10'>
                    <div className='w-1/5'>
                        <Heading heading={'Dashboard'} />
                        <AdminMenus />
                    </div>
                    <main className='w-full md:w-9/12'>
                        {children}
                    </main>
                </div>
            }
        </div>

    );
};

export default AdminLayout;