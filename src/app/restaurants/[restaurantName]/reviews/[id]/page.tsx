'use client'
import Heading from '@/app/components/shared/headings/Heading'
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner'
import ReviewCard from '@/app/components/ui/reviews/ReviewCard'
import { useGetDataQuery } from '@/app/lib/features/api/apiSlice'
import { ReviewData } from '@/app/types/DataTypes'

type Props = {
  params: {
    restaurantName: string,
    id: string
  }
}

const SingleFoodReviews = ({ params }: Props) => {
  //Get the Restaurant Reviews from the Server
  const { data:reviews, isLoading } = useGetDataQuery(`/reviews/restaurantsReview?id=${params.id}`)

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className='mx-auto my-2 md:my-5'>
      <Heading heading={'Restaurant Reviews'} />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5'>
        {
          reviews?.map((review: ReviewData) => <ReviewCard
            key={review._id}
            review={review} />)
        }
      </div>
    </div>
  )
}

export default SingleFoodReviews