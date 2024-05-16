import { ReactNode } from 'react';
import Heading from '../components/shared/headings/Heading';
import MyAccountMenus from '../components/ui/myaccount/MyAccountMenus';

const MyAccountLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10 flex gap-10'>
            <div className='w-1/5'>
                <Heading heading={'My Account'} />
                <MyAccountMenus />
            </div>
            <main className='w-full md:w-9/12'>
                {children}
            </main>
        </div>
    );
};

export default MyAccountLayout;