import SearchedFoods from '@/app/components/ui/searchPage/SearchedFoods'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Search Foods - FavFood',
    description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const FoodSearch = () => {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-2 md:my-5'>
            <SearchedFoods />
        </div>
    )
}

export default FoodSearch