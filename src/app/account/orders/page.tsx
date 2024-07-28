import DashboardSearch from '@/app/components/common/DashboardSearch';
import SubHeading from '@/app/components/shared/headings/SubHeading';
import DisplayOrders from '@/app/components/ui/myaccount/DisplayOrders';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders - FavFood',
  description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const Orders = () => {
  return (
    <div>
      <div className='flex gap-5 items-start justify-between'>
        <SubHeading heading={'Orders'} />
        <DashboardSearch />
      </div>
      <DisplayOrders />
    </div>
  )
}

export default Orders