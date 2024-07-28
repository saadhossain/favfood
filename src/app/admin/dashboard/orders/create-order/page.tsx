import SubHeading from '@/app/components/shared/headings/SubHeading';
import CreateOrderForm from '@/app/components/ui/admin/CreateOrderForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Order - FavFood',
  description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const CreateOrder = () => {
  return (
    <div>
      <SubHeading heading={'Create Order'} />
      <CreateOrderForm />
    </div>
  )
}

export default CreateOrder