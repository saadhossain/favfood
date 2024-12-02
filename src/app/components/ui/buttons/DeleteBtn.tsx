'use client'
import { useSetUserData } from '@/app/hooks/useSetUserData';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const DeleteBtn = ({ dataEndpoint, apiEndpoint }: { dataEndpoint: string, apiEndpoint: string }) => {
    const [targetData, setTargetData] = useState('');
    //Set Targeted Data
    useEffect(() => {
        setTargetData(dataEndpoint)
    }, [dataEndpoint])

    const { refetch } = useSetUserData(targetData);

    const handleDeleteReview = async () => {
        const isConfirmed = window.confirm('Do you want to Delete this Review?');
        if (isConfirmed) {
            const res = await fetch(apiEndpoint, {
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
            onClick={() => handleDeleteReview()}
        />
    )
}

export default DeleteBtn