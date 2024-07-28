import DashboardSearch from '@/app/components/common/DashboardSearch';
import AddButton from '@/app/components/shared/buttons/AddButton';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import OrderLists from '@/app/components/ui/admin/OrderLists';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders - FavFood',
  description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const AllOrders = () => {
  return (
    <div>
      <div className='flex gap-5 items-start justify-between'>
        <SubHeading heading={'Orders'} />
        <div className='flex flex-col gap-2 items-end'>
          <AddButton endpoint='/orders/create-order' title='Create Order' />
          <DashboardSearch />
        </div>
      </div>
      <OrderLists />
    </div>
  )
}

export default AllOrders