'use client'
import Heading from '@/app/components/shared/headings/Heading'
import ReviewCard from '@/app/components/ui/reviews/ReviewCard'
import { ReviewData } from '@/app/types/DataTypes'
import { fetchReviewData } from '@/app/utils/fetchReviewData'

type Props = {
  params: {
    id: string,
    foodSlug: string
  }
}

const SingleFoodReviews = ({ params }: Props) => {
  const reviews = fetchReviewData('foodsReview', params.id);
  return (
    <div className='w-11/12 md:w-10/12 mx-auto my-2 md:my-5'>
      <Heading heading={'Food Reviews'} />
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