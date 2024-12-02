import ReviewContent from '@/app/components/ui/admin/ReviewContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reviews - FavFood',
  description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const Reviews = () => {
  return (
    <ReviewContent />
  )
}

export default Reviews