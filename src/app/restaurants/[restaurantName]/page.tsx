import DisplayRestaurantInfo from '@/app/components/ui/restaurant/DisplayRestaurantInfo';

interface Props {
  params: {
    restaurantName: string
  }
}

export const generateMetadata = ({ params }: Props) => {
  const restaurantName = decodeURIComponent(params.restaurantName);
  return {
    title: `${restaurantName.toUpperCase()} - FavFood`,
    description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
  }
}

const page = ({ params }: Props) => {
  const restaurantName = decodeURIComponent(params.restaurantName);
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 my-5'>
      <DisplayRestaurantInfo restaurantName={restaurantName} />
    </div>
  )
}

export default page