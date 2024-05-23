'use client'
import Heading from '@/app/components/shared/headings/Heading';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const { data: session } = useSession();
    const route = useRouter();
    if (session?.user.role !== 'admin') {
        route.push('/account');
        return <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10'>
            <SubHeading heading={'Unauthorized Access'} />
        </div>;
    }
    return (
        <>
            {
                session && session?.user.role === 'admin' && <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10 flex gap-10'>
                    <div className='w-1/5'>
                        <div className='sticky top-20 z-40'>
                            <Heading heading={'Dashboard'} />
                        </div>
                    </div>
                    <main className='w-full md:w-9/12'>
                        {children}
                    </main>
                </div>
            }
        </>

    );
};

export default AdminLayout;