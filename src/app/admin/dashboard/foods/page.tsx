import AddButton from '@/app/components/shared/buttons/AddButton'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import FoodLists from '@/app/components/ui/admin/FoodLists'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Foods - FavFood',
  description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}


const Foods = () => {
  return (
    <div>
      <div className='flex gap-5 items-center justify-between'>
        <SubHeading heading={'Foods'} />
        <div className='flex flex-col gap-2 items-end'>
          <AddButton endpoint='/foods/add-food' title='Add Food' />
        </div>
      </div>
      <FoodLists />
    </div>
  )
}

export default Foods