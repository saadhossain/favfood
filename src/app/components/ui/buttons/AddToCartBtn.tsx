'use client'
import { addToCart } from '@/app/lib/features/cartSlice';
import { useAppDispatch } from '@/app/lib/hooks';
import toast from 'react-hot-toast';
import { FaCartShopping } from 'react-icons/fa6';


const AddToCartBtn = ({ prodId }: { prodId: string }) => {
    const dispatch = useAppDispatch();
    const handleAddToCart = (id: string) => {
        dispatch(addToCart({ id, quantity: 1 }))
        toast.success('Food added to Cart.');
    }
    return (
        <button
            onClick={() => handleAddToCart(prodId)}
            className='flex gap-1 items-center py-1 px-2 md:py-2 md:px-3 rounded-md bg-primary text-white hover:bg-secondary duration-200 ease-in-out'><FaCartShopping />Order</button>
    )
}

export default AddToCartBtn

