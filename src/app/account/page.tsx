import { Metadata } from 'next';
import SubHeading from '../components/shared/headings/SubHeading';

export const metadata: Metadata = {
    title: 'Activities - FavFood',
    description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const Account = async () => {
    return (
        <div>
            <SubHeading heading={'Recent Activities'} />
        </div>
    );
};

export default Account;