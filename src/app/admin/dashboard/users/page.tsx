import DashboardSearch from '@/app/components/common/DashboardSearch';
import AddButton from '@/app/components/shared/buttons/AddButton';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import UserLists from '@/app/components/ui/admin/UserLists';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users - FavFood',
  description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}


const Users = () => {
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Users'} />
        <div className='flex flex-col gap-2 items-end'>
          <AddButton endpoint='/users/add-user' title='Add User' />
          <DashboardSearch />
        </div>
      </div>
      <UserLists />
    </div>
  )
}

export default Users