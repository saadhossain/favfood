'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading';
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner';
import Processing from '@/app/components/spinner/Processing';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const { data: session } = useSession();
  const [isEditable, setIsEditable] = useState(false);

  const handleEditProfile = (e: FormEvent) => {
    e.preventDefault();
  }
  return (
    <div>
      <SubHeading heading={'Profile'} />
      {
        !session ? <LoadingSpinner /> : <div className='flex gap-5 items-center'>
          <div className='w-2/5 flex flex-col items-center justify-center'>
            <Image src={session?.user.image} alt={session?.user.fullName} width={100} height={100} className='rounded-full' />
            <h4 className='text-lg font-semibold'>{session?.user.fullName}</h4>
          </div>
          <form
            onSubmit={handleEditProfile}
            className="w-3/5">
            <div className='flex justify-end'>
              <FaEdit onClick={() => setIsEditable(!isEditable)} className='cursor-pointer w-5 h-5 hover:text-primary' />
            </div>
            <div className=' mb-3'>
              <label htmlFor="name" className="block text-sm font-semibold">Full Name</label>
              <input type="text" name="name" id="name" value={session?.user.fullName} className={`w-full px-3 py-2 rounded-md ${isEditable ? 'bg-gray-300' : 'bg-gray-400'} text-gray-900 focus:outline-none`} disabled={!isEditable} />
            </div>
            <div className='mb-3'>
              <label htmlFor="email" className="block text-sm font-semibold">Email Address</label>
              <input type="email" name="email" id="email" value={session?.user.email} className={`w-full px-3 py-2 rounded-md ${isEditable ? 'bg-gray-300' : 'bg-gray-400'} text-gray-900 focus:outline-none`} disabled={!isEditable} />
            </div>
            <div className='mb-3'>
              <label htmlFor="phone" className="block text-sm font-semibold">Phone</label>
              <input type="tel" name="phone" id="phone" value={session?.user?.phone && session?.user?.phone} className={`w-full px-3 py-2 rounded-md ${isEditable ? 'bg-gray-300' : 'bg-gray-400'} text-gray-900 focus:outline-none`} disabled={!isEditable} />
            </div>
            <div className='w-full flex items-center justify-between mb-3 font-semibold border-b-2 border-gray-200 pb-2'>
              <p>Role</p>
              <p className='capitalize'>{session?.user.role}</p>
            </div>
            <div className='w-full flex items-center justify-between mb-3 font-semibold'>
              <p>Status</p>
              <p className='text-red-600'>{session?.user?.isActive ? 'Verified' : 'Unverified'}</p>
            </div>
            <button type="submit"
              disabled={!isEditable}
              className={`w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md ${isEditable ? 'bg-primary' : 'bg-gray-400'} text-white`}>
              {/* {processing ? <Processing title={'Processing'} /> : 'Login'} */}
              Edit Profile
            </button>
          </form>
        </div>
      }
    </div>
  )
}

export default Profile