import SubHeading from '@/app/components/shared/headings/SubHeading';
import ChangePassword from '@/app/components/ui/myaccount/ChangePassword';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Change Password - FavFood',
  description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const Password = () => {
  return (
    <div>
      <SubHeading heading={'Password'} />
      <ChangePassword />
    </div>
  )
}

export default Password