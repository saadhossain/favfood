'use client'
import { setOpenEditReviewModal, setOpenOrderEditModal, setSingleDataId } from '@/app/lib/features/commonFeaturesSlice';
import { useAppDispatch } from '@/app/lib/hooks';
import { FilePenLine } from 'lucide-react';

const EditBtn = ({ id, modalType }: { id: string, modalType: string }) => {
    const dispatch = useAppDispatch();

    let modalToOpen: any;

    if (modalType === 'review') {
        modalToOpen = setOpenEditReviewModal
    } else if (modalToOpen === 'order') {
        modalToOpen === setOpenOrderEditModal
    }

    return (
        <FilePenLine
            className='cursor-pointer text-green-600'
            aria-label='Edit Review'
            size={18}
            onClick={() => {
                dispatch(modalToOpen())
                dispatch(setSingleDataId(id))
            }}
        />
    )
}

export default EditBtn