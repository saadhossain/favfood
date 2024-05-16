import { ReactNode } from 'react';
import MyAccountMenus from '../components/ui/myaccount/MyAccountMenus';
import Heading from '../components/shared/headings/Heading';

const MyAccountLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10'>
            <Heading heading={'My Account'}/>
            <div className='flex gap-10'>
                <MyAccountMenus />
                <main className='w-full md:w-9/12'>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MyAccountLayout;