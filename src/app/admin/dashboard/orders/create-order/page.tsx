'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading';
import Processing from '@/app/components/spinner/Processing';
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { fetchDataForAdmin } from '@/app/utils/fetchDataForAdmin';
import { useContext, useState } from 'react';

const CreateOrder = () => {
  const { loading } = useContext(DataContext) as DataContextType;
  const [error, setError] = useState(null);
  const restaurants = fetchDataForAdmin('/api/restaurants');
  return (
    <div>
      <SubHeading heading={'Create Order'} />
      {/* Create New Order */}
      <form
        // onSubmit={(e) => handleUserRegistration(e)}
        className="space-y-6">
        <div className="space-y-2">
          {/* Name and Price */}
          <div className='flex gap-2 items-center justify-between'>
            <div className='w-4/5'>
              <label htmlFor="foodName" className="block mb-2 text-sm">Product Name</label>
              <input type="text" name="foodName" id="foodName" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
            </div>
            <div className='w-1/5'>
              <label htmlFor="price" className="block mb-2 text-sm">Price</label>
              <input type="number" name="price" id="price" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
            </div>
          </div>
          {/* Category, Restaurant Name and Food Image */}
          <div className='flex gap-2 items-center justify-between'>
            <div className='w-1/3'>
              <label htmlFor="category" className="block mb-2 text-sm">Category</label>
              <input type="text" name="category" id="category" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
            </div>
            <div className='w-1/3'>
              <label htmlFor="restrauName" className="block mb-2 text-sm">Restaurant Name</label>
              <input type="text" name="restrauName" id="restrauName" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
            </div>
            <div className='w-1/3'>
              <label htmlFor="foodImage" className="text-sm">Image</label>
              <input type="file" name="foodImage" id="foodImage" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
            </div>
          </div>
          <div>
              <label htmlFor="description" className="text-sm">Description</label>
              <textarea name="description" id="description" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"></textarea>
            </div>
        </div>
        {
          error &&
          <div className="text-red-500 text-lg">
            {error}
          </div>
        }
        <div className="space-y-2">
          <div>
            <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">{loading ? <Processing title={'Processing'} /> : 'Add Food'}</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder