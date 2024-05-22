'use client'
import AddAddressModal from '@/app/components/modals/AddAddressModal';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddressBook = () => {
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch('/api/countries');
      const data = await res.json();
      setCountries(data);
    }
    getCountries();
  }, [openModal]);

  return (
    <div>
      <SubHeading heading={'Address Book'} />
      {
        !session ? <LoadingSpinner /> : <div className='w-full md:flex flex-col items-center gap-4 mt-5 md:mt-10'>
          {/* Default Address */}
          <SubHeading heading={'No Address Found! Please Add...'} />
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
      <AddAddressModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        countries={countries}
        userInfo={session?.user}
      />
    </div>
  )
}

export default AddressBook