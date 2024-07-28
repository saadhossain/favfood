import SubHeading from '@/app/components/shared/headings/SubHeading';
import AddFoodForm from '@/app/components/ui/admin/AddFoodForm';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Add Food - FavFood',
    description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const AddFood = () => {
    return (
        <div>
            <SubHeading heading={'Add New Food'} />
            {/* Add New Food */}
            <AddFoodForm />
        </div>
    )
}

export default AddFood;