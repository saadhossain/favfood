'use client'
import AddAddressModal from '@/app/components/modals/AddAddressModal';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddressBook = () => {
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
  }
  return (
    <div>
      <SubHeading heading={'Address Book'} />
      {
        !session ? <LoadingSpinner /> : <div className='w-full md:flex items-center gap-4 mt-2 md:mt-5'>
          {/* Default Address */}
          <SubHeading heading={'No Address Found!'}/>
          {/* Add New Address */}
          <div
            onClick={() => setOpenModal(!openModal)}
            className='w-full md:w-2/4 flex flex-col justify-center text-gray-800 border-2 border-dashed border-gray-800 rounded-md p-4 mt-2 md:mt-0 cursor-pointer h-28'>
            <p className='flex items-center justify-center gap-2 text-lg'>
              <FaPlus /> Add New Address
            </p>
          </div>
        </div>
      }
      <AddAddressModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  )
}

export default AddressBook