'use client'
import React from 'react'
interface Props{
  params:{
    restaurantName:string
  }
}

const RestaurantsReviews = ({params}:Props) => {
    console.log(params.restaurantName)
  return (
    <div className='my-5'>Restaurants Reviews</div>
  )
}

export default RestaurantsReviews