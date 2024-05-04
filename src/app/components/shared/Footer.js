import Image from 'next/image';
import FavFood from '/public/favfood-icon.png';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className='w-full bg-gray-100 py-5'>
            <div className='w-10/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 justify-between'>
                <Image src={FavFood} alt='FavFood' width={150} height={150} className='hidden md:block'/>
                <div>
                    <h4 className='text-lg font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>Quick Links</h4>
                    <ul className='flex flex-col gap-3'>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/payment-policy'>Payment Policy</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/return-refund'>Return and Refund</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/terms-conditions'>Terms & Conditions</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/privacy-policy'>Privacy Policy</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className='text-lg font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>About FavFood</h4>
                    <ul className='flex flex-col gap-3'>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/careers'>Careers</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/press'>Press release</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/affiliate'>Affiliate Programs</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/partnership'>Partner with us</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className='text-lg font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>Customer Care</h4>
                    <ul className='flex flex-col gap-3'>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/help'>Help Center</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/cashback'>Cashback Offer</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/safety'>Safety & Security</Link></li>
                        <li className='text-black hover:text-secondary duration-200'><Link href='/partnership'>FavFood Operations</Link></li>
                    </ul>
                </div>
            </div>
            <div className='w-10/12 mx-auto border-t-2 border-gray-200 my-2'>
                <p className='text-center mt-2'>&copy; 2024 - All Rights Reserved | FavFood.</p>
            </div>
        </div>
    );
};

export default Footer;