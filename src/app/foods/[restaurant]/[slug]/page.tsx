import SingleFoodCard from '@/app/components/ui/food/SingleFoodCard';

interface paramsTypes {
  restaurant: string;
  slug: string;
}

export const generateMetadata = ({ params }: { params: paramsTypes }) => {
  const foodName = params.slug;
  return {
    title: `${foodName.toUpperCase()} - FavFood`,
    description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
  }
}

const FoodSinglePage = ({ params }: { params: paramsTypes }) => {

  return (
    <SingleFoodCard params={params} />
  );
};

export default FoodSinglePage;