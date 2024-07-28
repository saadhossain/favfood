'use client'
import { setOpenAddressBoxModal } from '@/app/lib/features/commonFeaturesSlice';
import { useAppDispatch } from '@/app/lib/hooks';
import { SessionData } from '@/app/types/DataTypes';
import { useSession } from 'next-auth/react';
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa';
import SubHeading from '../../shared/headings/SubHeading';


const CheckoutAddressBook = () => {
    const { data: session } = useSession<SessionData | any>();
    const dispatch = useAppDispatch();
    return (
        <>
            <div className='w-full md:flex items-center gap-4 mt-2 md:mt-5'>
                {/* Default Address */}
                {
                    !session?.user?.address?.city ? <SubHeading heading={'No Address Found! Please Add One...'} /> : <div className='w-full md:w-2/4 bg-primary text-white font-semibold rounded-md p-4'>
                        <FaMapMarkerAlt className='w-5 h-5 mb-2' />
                        <p>Street: {session?.user?.address?.streetAddress}</p>
                        <div className='flex items-center gap-5'>
                            <p>City: {session?.user?.address?.city}</p>
                            <p>State: {session?.user?.address?.state}</p>
                        </div>
                        <div className='flex items-center gap-5'>
                            <p>ZIP: {session?.user?.address?.zipCode}</p>
                            <p>Country: {session?.user?.address?.country}</p>
                        </div>
                    </div>
                }
                {/* Add New Address Box */}
                <div
                    onClick={() => dispatch(setOpenAddressBoxModal())}
                    className='w-full md:w-2/4 flex flex-col justify-center text-gray-800 border-2 border-dashed border-gray-800 rounded-md p-4 mt-2 md:mt-0 cursor-pointer h-36'>
                    <p className='flex items-center justify-center gap-2 text-lg'>
                        <FaPlus /> Add New Address
                    </p>
                </div>
            </div>
            {/* Special Note */}
            <div className='my-5'>
                <h5 className='text-md font-semibold mb-2'>Special Note</h5>
                <form>
                    <textarea placeholder="Write your special note here." className="w-full px-3 py-2 rounded-md border border-gray-800 text-gray-900 focus:outline-none" />
                </form>
            </div>
        </>
    );
};

export default CheckoutAddressBook;