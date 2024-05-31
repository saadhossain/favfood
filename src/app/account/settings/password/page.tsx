'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading';
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner';
import Processing from '@/app/components/spinner/Processing';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { updateData } from '@/app/utils/updateData';
import { signOut, useSession } from 'next-auth/react';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Password = () => {
  const { loading, setLoading, showPassword, setShowPassword } = useContext(DataContext) as DataContextType;
  const { data: session } = useSession();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setLoading(true);
    if(newPassword.length < 10) {
      setError('Password must be at least 10 characters long');
      setLoading(false);
      return;
    }
    const data = await updateData(`/users?userId=${session?.user._id}`, { password: newPassword });
    if (data.acknowledged) {
      toast.success('Password updated successfully');
      setLoading(false);
      form.reset();
      await signOut();
    }
  }
  return (
    <div>
      <SubHeading heading={'Password'} />
      {
        !session ? <LoadingSpinner /> : <div className='flex gap-5 items-center justify-center'>
          <form
            onSubmit={handlePasswordChange}
            className="w-full md:w-3/5">
            <div className='mb-3'>
              <label htmlFor="oldPass" className="block text-sm font-semibold">Old Password</label>
              <input type="text" name="oldPass" id="oldPass"
                value={session?.user.password && session?.user.password}
                className='w-full px-3 py-2 rounded-md bg-gray-400 text-gray-900'
                disabled
              />
            </div>
            <div className='mb-3 relative'>
              <label htmlFor="newPass" className="block text-sm font-semibold">Enter New Password</label>
              <input type={`${showPassword ? 'password' : 'text'}`} name="newPass" id="newPass"
                className='w-full px-3 py-2 rounded-md bg-gray-300 text-gray-900 focus:outline-none'
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className='cursor-pointer absolute top-8 right-2'
              >
                {
                  showPassword ? <FaEye /> : <FaEyeSlash />
                }
              </div>
            </div>
            {
              error && <p className='text-lg text-red-500'>{error}</p>
            }
            <button type="submit"
              className='w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white'>
              {loading ? <Processing title={'Processing'} /> : 'Change Password'}
            </button>
          </form>
        </div>
      }
    </div>
  )
}

export default Password