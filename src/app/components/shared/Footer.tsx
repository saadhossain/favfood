import Image from 'next/image';
import Link from 'next/link';
import FavFood from '/public/favfood-icon.png';

const Footer = () => {
    return (
        <footer className='w-full bg-gray-100 py-5'>
            <div className='w-11/12 md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 justify-between'>
                <Image src={FavFood} alt='FavFood' width={150} height={150} className='hidden md:block' />
                <div>
                    <h4 className='text-lg font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>Quick Links</h4>
                    <ul className='flex flex-col gap-3'>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/pages/payment-policy'>Payment Policy</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/pages/return-refund'>Return and Refund</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/pages/terms-conditions'>Terms & Conditions</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/pages/privacy-policy'>Privacy Policy</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className='text-lg font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>About FavFood</h4>
                    <ul className='flex flex-col gap-3'>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/pages/about'>About Us</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/pages/careers'>Careers</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/pages/press'>Press release</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/pages/affiliate'>Affiliate Programs</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className='text-lg font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>Customer Care</h4>
                    <ul className='flex flex-col gap-3'>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/pages/help'>Help Center</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/pages/cashback'>Cashback Offer</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/pages/safety-security'>Safety & Security</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/pages/partnership'>Partner with us</Link></li>
                    </ul>
                </div>
            </div>
            <div className='w-10/12 mx-auto border-t-2 border-gray-200 my-2'>
                <p className='text-center mt-2'>&copy; 2024 - All Rights Reserved | FavFood.</p>
            </div>
        </footer>
    );
};

export default Footer;