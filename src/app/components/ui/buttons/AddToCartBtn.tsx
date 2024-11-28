'use client'
import { addToCart } from '@/app/lib/features/cartSlice';
import { useAppDispatch } from '@/app/lib/hooks';
import { FoodData } from '@/app/types/DataTypes';
import toast from 'react-hot-toast';
import { FaCartShopping } from 'react-icons/fa6';


const AddToCartBtn = ({ product }: { product: FoodData }) => {
    const dispatch = useAppDispatch();

    //Functionality to add product to cart
    const handleAddToCart = (prod: FoodData) => {
        const prodInfo = {
            _id: prod._id,
            name: prod.name,
            slug: prod.slug,
            restaurant: prod.restaurant,
            price: prod.price,
            image: prod.image
        };
        dispatch(addToCart({ ...prodInfo, quantity: 1 }))
        toast.success('Food added to Cart.');
    }
    return (
        <button
            onClick={() => handleAddToCart(product)}
            className='flex gap-1 items-center py-1 px-2 md:py-2 md:px-3 rounded-md bg-primary text-white hover:bg-secondary duration-200 ease-in-out'><FaCartShopping />Order</button>
    )
}

export default AddToCartBtn

