import Heading from '@/app/components/shared/headings/Heading'
import DisplayCatFoods from '@/app/components/ui/searchPage/DisplayCatFoods';

interface Props {
    params: {
        categoryName: string
    }
}

export const generateMetadata = ({ params }: Props) => {
    const catName = params.categoryName;
    return {
        title: `${catName.toUpperCase()} - FavFood`,
        description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
    }

}

const SingleCategoryFoods = ({ params }: Props) => {
    const catName = params.categoryName;
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-5'>
            <Heading heading={`Foods for ${catName.toUpperCase()}`} />
            {/* Display Category foods */}
            <DisplayCatFoods catName={catName} />
        </div>
    )
}

export default SingleCategoryFoods