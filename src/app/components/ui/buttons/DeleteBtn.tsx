'use client'
import { useSetUserData } from '@/app/hooks/useSetUserData';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';

const DeleteBtn = ({ id }: { id: string }) => {
    const { refetch } = useSetUserData('/reviews');

    const handleDeleteReview = async (reviewId: string) => {
        const isConfirmed = window.confirm('Do you want to Delete this Review?');
        if (isConfirmed) {
            const res = await fetch(`/api/reviews?id=${reviewId}`, {
                method: 'DELETE'
            });
            const { result } = await res.json();
            console.log(result);
            if (result.acknowledged) {
                toast.success('Review Deleted Successfully.');
                refetch()
            }
        }
    }
    return (
        <Trash
            className='cursor-pointer text-red-500' aria-label='Delete Review'
            size={18}
            onClick={() => handleDeleteReview(id)}
        />
    )
}

export default DeleteBtn