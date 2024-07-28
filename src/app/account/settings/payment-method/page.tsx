import SubHeading from '@/app/components/shared/headings/SubHeading'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: 'Payment Methods - FavFood',
  description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const PaymentMethod = () => {
  return (
    <div>
      <SubHeading heading={'Payment Method'} />
      <div className='flex flex-col items-center justify-center h-[50vh]'>
        <h4 className='text-lg font-semibold'>No Saved Payment Method Found!</h4>
        <button className='bg-primary text-white font-semibold py-3 px-5 rounded-md mt-5 hover:bg-secondary duration-300 ease-in-out'>Add Payment Method</button>
      </div>
    </div>
  )
}

export default PaymentMethod