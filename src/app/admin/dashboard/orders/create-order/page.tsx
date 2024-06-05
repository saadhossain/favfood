'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading';
import Processing from '@/app/components/spinner/Processing';
import { DataContext } from '@/app/context/DataContext';
import { useGetAdminDataQuery } from '@/app/lib/features/api/apiSlice';
import { DataContextType } from '@/app/types/DataContextTypes';
import { FoodData, UserData } from '@/app/types/DataTypes';
import { saveToDatabase } from '@/app/utils/saveToDatabase';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CreateOrder = () => {
  const { setLoading, loading } = useContext(DataContext) as DataContextType;
  const route = useRouter();

  //Get Foods Data from server
  const { data } = useGetAdminDataQuery('/foods');
  const foods = data?.result;
  //Get the Registered Users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('/api/users');
      const { result } = await res.json();
      setUsers(result);
    }
    getUsers();
  }, [])
  //Set the selected Restaurant to the state
  const [selectedFood, setSelectedFood] = useState<FoodData | any>(null);
  //Set the selected Restaurant to the state
  const [selectedUser, setSelectedUser] = useState<UserData | any>(null);

  const handleFoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const foodId = e.target.value;
    const foundFood = foods.find((food: FoodData) => food._id === foodId);
    setSelectedFood(foundFood);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    const foundUser = users.find((user: UserData) => user._id === userId);
    setSelectedUser(foundUser);
  };


  const handleAddFood = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;

    //Arrange Product Informations
    const productData = {
      _id: selectedFood._id,
      name: selectedFood.name,
      slug: selectedFood.slug,
      restaurantName: selectedFood.restaurant,
      price: selectedFood.price,
      image: selectedFood.image,
      quantity: 1
    };
    // //Arrange order data to save to database
    const orderData = {
      products: productData,
      orderAmount: selectedFood.price,
      userInfo: {
        _id: selectedUser._id,
        fullName: selectedUser.fullName
      },
      paymentMethod: 'COD',
      orderStatus: 'Processing',
      deliveryAddress: selectedUser.address || null,
      orderDate: new Date(),
      paymentStatus: 'Unpaid'
    }
    try {
      const data = await saveToDatabase('/api/orders', orderData);
      if (data.status) {
        form.reset();
        setLoading(false);
        toast.success('Order Created Successfully.');
        route.push('/admin/dashboard/orders');
      }
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
  }
  return (
    <div>
      <SubHeading heading={'Create Order'} />
      <form onSubmit={handleAddFood} className="space-y-6">
        <div className="space-y-2">
          <div className='flex gap-2 items-center justify-between'>
            <div className='w-3/5'>
              <label htmlFor="food" className="font-semibold block mb-2 text-sm">Select Food</label>
              <select
                className='w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none'
                onChange={handleFoodChange}
                name="food"
                id="food"
              >
                <option value="">Select a food</option>
                {foods.map((food: FoodData) => (
                  <option key={food._id} value={food._id}>{food.name}</option>
                ))}
              </select>
            </div>
            <div className='w-2/5'>
              <label htmlFor="user" className="font-semibold block mb-2 text-sm">Assign to User</label>
              <select
                className='w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none'
                onChange={handleUserChange}
                name="user"
                id="user"
              >
                <option value="">Select a user</option>
                {users.map((user: UserData) => (
                  <option key={user._id} value={user._id}>{user.email}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">
            {loading ? <Processing title={'Processing'} /> : 'Create Order'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder