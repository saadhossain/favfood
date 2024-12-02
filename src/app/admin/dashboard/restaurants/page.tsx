import AddButton from '@/app/components/shared/buttons/AddButton'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import RestaurantLists from '@/app/components/ui/admin/RestaurantLists'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Restaurants - FavFood',
  description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const Restaurants = () => {
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Restaurants'} />
        <div className='flex flex-col gap-2 items-end'>
          <AddButton endpoint='/restaurants/add-restaurant' title='Add Restaurant' />
        </div>
      </div>
      <RestaurantLists />
    </div>
  )
}

export default Restaurants