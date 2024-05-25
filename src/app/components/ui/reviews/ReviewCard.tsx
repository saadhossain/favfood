import { ReviewData } from '@/app/types/DataTypes';
import Image from 'next/image';
import { FaCalendarAlt, FaStar } from "react-icons/fa";

const ReviewCard = ({ review }: { review: ReviewData }) => {
    const date = new Date(review.addedOn);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const year = date.getUTCFullYear();
    const publishedDate = `${day}-${month}-${year}`
    return (
        <div className='bg-gray-100 p-3 rounded-md'>
            <div className='flex items-center justify-between font-semibold text-xl'>
                <h4>{review.title}</h4>
                <p className='flex items-center gap-1 text-primary'><FaStar />{review.rating}</p>
            </div>
            <p>{review.description}</p>
            <div className='flex gap-2 items-center my-2'>
                <Image src={review.userProfileImage} alt={review.userName} width={60} height={60} className='rounded-full' />
                <div>
                    <p className='text-lg font-semibold'>{review.userName}</p>
                    <p className='flex gap-2 items-center text-lg'><FaCalendarAlt /> {publishedDate}</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard