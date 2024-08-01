import { Metadata } from 'next';
import Heading from '../components/shared/headings/Heading';
import DisplayWishlists from '../components/ui/wishlist/DisplayWishlists';

export const metadata: Metadata = {
    title: 'Wishlist - FavFood',
    description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const Wishlist = () => {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-3 md:my-10 md:flex gap-10 justify-between'>
            {/* Wishlist Items */}
            <div className='w-full md:w-10/12'>
                <Heading heading={'Wishlist'} />
                <DisplayWishlists />
            </div>
        </div>
    );
};

export default Wishlist;