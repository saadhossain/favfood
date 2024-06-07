'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading';
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner';
import { setOpenAddressBoxModal } from '@/app/lib/features/commonFeaturesSlice';
import { useAppDispatch } from '@/app/lib/hooks';
import { useSession } from 'next-auth/react';
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa';

const AddressBook = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  return (
    <div>
      <SubHeading heading={'Address Book'} />
      {
        !session ? <LoadingSpinner /> : <div className='w-full md:flex flex-col items-center gap-4 mt-5 md:mt-10'>
          {session?.user.address?.city ? <div className='w-full md:w-2/4 bg-gray-200 text-gray-700 font-semibold rounded-md p-4'>
            <FaMapMarkerAlt className='w-5 h-5 mb-2 text-primary' />
            <p>Street: {session?.user.address.streetAddress}</p>
            <div className='flex items-center gap-5'>
              <p>City: {session?.user.address.city}</p>
              <p>State: {session?.user.address.state}</p>
            </div>
            <div className='flex items-center gap-5'>
              <p>ZIP: {session?.user.address.zipCode}</p>
              <p>Country: {session?.user.address.country}</p>
            </div>
          </div>
            : <>
              <SubHeading heading={'No Address Found! Please Add One...'} />
              {/* Add New Address */}
              <div
                onClick={() => dispatch(setOpenAddressBoxModal())}
                className='w-full md:w-2/4 flex flex-col justify-center text-gray-800 border-2 border-dashed border-gray-800 rounded-md p-4 mt-2 md:mt-0 cursor-pointer h-28'>
                <p className='flex items-center justify-center gap-2 text-lg'>
                  <FaPlus /> Add New Address
                </p>
              </div>
            </>
          }

        </div>
      }
    </div>
  )
}

export default AddressBook