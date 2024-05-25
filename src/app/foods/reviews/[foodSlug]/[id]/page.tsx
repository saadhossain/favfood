import React from 'react'

type Props={
    params:{
        id:string
    }
}

const SingleFoodReviews = ({params}:Props) => {
    console.log(params.id);
  return (
    <div className='w-11/12 md:w-10/12 mx-auto my-2 md:my-5'>
        Single Food Reviews
        FoodId: {params.id}
    </div>
  )
}

export default SingleFoodReviews