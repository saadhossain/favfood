'use client'
import Heading from '@/app/components/shared/headings/Heading'
import ReviewCard from '@/app/components/ui/reviews/ReviewCard'
import { ReviewData } from '@/app/types/DataTypes'
import { fetchReviewData } from '@/app/utils/fetchReviewData'

type Props = {
  params: {
    restaurantName: string,
    id: string
  }
}

const SingleFoodReviews = ({ params }: Props) => {
  const reviews = fetchReviewData('restaurantsReview', params.id);
  return (
    <div className='mx-auto my-2 md:my-5'>
      <Heading heading={'Restaurant Reviews'} />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5'>
        {
          reviews.map((review: ReviewData) => <ReviewCard
            key={review._id}
            review={review} />)
        }
      </div>
    </div>
  )
}

export default SingleFoodReviews