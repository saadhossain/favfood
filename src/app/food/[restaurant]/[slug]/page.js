'use client';
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner';
import { DataContext } from '@/app/context/DataContext';
import { useHandleAddToCart } from '@/app/hooks/useHandleAddToCart';
import { fetchSingleFoodData } from '@/app/utils/fetchSingleFoodData';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import { FaCartShopping, FaShop, FaStar } from "react-icons/fa6";

const FoodSinglePage = ({ params }) => {
  const { loading } = useContext(DataContext);
  const singleFood = fetchSingleFoodData(params.restaurant, params.slug);
  // console.log(singleFood);
  const handleAddToCart = useHandleAddToCart();
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className={`w-11/12 md:w-10/12 mx-auto my-2 md:my-5 ${!singleFood._id && 'hidden'}`}>
      {/* Product Image and Details */}
      <div className='flex gap-12 text-gray-800'>
        <Image src={singleFood.image} alt={singleFood.name} width={450} height={350} className='rounded-md' />
        {/* Product Details */}
        <div className='mt-3'>
          <div className='flex gap-1 text-primary items-center'>
            {Array.from({ length: 5 }).map((_, index) => (<FaStar key={index} />))}
            <span className='text-gray-800'>({singleFood.reviewCount} reviews)</span>
          </div>
          <h2 className='text-3xl font-semibold'>{singleFood.name}</h2>
          <h5 className='flex items-center gap-1 font-semibold text-green-600'><FaCheckCircle /> In Stock</h5>
          <Link href='/' className='flex items-center gap-1 font-semibold hover:text-primary'><FaShop />{singleFood.restaurant_Name}</Link>
          <h3 className='text-2xl font-semibold text-primary'>${singleFood.price}</h3>
          <h5 className='font-semibold'>Product Details</h5>
          <p>{singleFood.description}</p>
          {/* //Action Buttons */}
          <div className='flex gap-2 items-center'>
            <button
              onClick={() => handleAddToCart(singleFood?._id)}
              className='flex gap-2 items-center bg-primary text-white py-2 px-5 rounded-md my-3 hover:bg-secondary duration-300 ease-in-out'><FaCartShopping />Add to Cart</button>
            <button className='flex gap-2 items-center border-2 border-primary text-primary py-[6px] px-5 rounded-md my-3 hover:bg-primary hover:text-white duration-300 ease-in-out'><FaHeart />Wishlist</button>
          </div>
        </div>
      </div>
      {/* Product Reviews */}
      <h2 className='text-xl font-semibold text-primary border-l-4 border-primary pl-2 mt-5'>Reviews</h2>
    </div>
  );
};

export default FoodSinglePage;