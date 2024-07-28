import SubHeading from '@/app/components/shared/headings/SubHeading'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Dashboard - FavFood',
  description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const Dashboard = () => {
  return (
    <div>
      <SubHeading heading={'Dashboard'}/>
    </div>
  )
}

export default Dashboard