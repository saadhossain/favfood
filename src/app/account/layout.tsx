import { ReactNode } from 'react';
import HorizontalMenu from '../components/ui/myaccount/HorizontalMenu';

const MyAccountLayout = ({ children }: {children:ReactNode}) => {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10'>
            <h2 className='text-xl md:text-2xl font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>My Account</h2>
            <div className='flex gap-10'>
                <HorizontalMenu />
                <main className='w-full md:w-9/12'>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MyAccountLayout;