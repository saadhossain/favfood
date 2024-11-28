'use client';
import LoadingSpinner from '@/app/components/spinner/LoadingSpinner';
import ReviewCard from '@/app/components/ui/reviews/ReviewCard';
import { useHandleAddToWishlist } from '@/app/hooks/useHandleAddToWishlist';
import { useGetDataQuery, useGetSingleDataQuery } from '@/app/lib/features/api/apiSlice';
import { FoodData, ReviewData } from '@/app/types/DataTypes';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import { FaShop, FaStar } from "react-icons/fa6";
import AddToCartBtn from '../buttons/AddToCartBtn';

interface paramsTypes {
    restaurant: string;
    slug: string;
}

const SingleFoodCard = ({ params }: { params: paramsTypes }) => {
    //Get the Single food from ther server
    const { data } = useGetSingleDataQuery(`/foods/single?restaurant=${params.restaurant}&slug=${params.slug}`)
    const singleFood: FoodData | any = data;
    const handleAddToWishlist = useHandleAddToWishlist();
    //Get the Foods Reviews from the Server
    const { data: reviews, isLoading } = useGetDataQuery(`/reviews/foodsReview?id=${singleFood?._id}`);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-2 md:my-5'>
            {
                singleFood?._id && <div>
                    {/* Product Image and Details */}
                    <div className='flex gap-12 text-gray-800'>
                        <Image src={singleFood.image} alt={singleFood.name} width={450} height={350} className='rounded-md hidden md:block' />
                        {/* Product Details */}
                        <div className='mt-3'>
                            {/* Product Review Count */}
                            <div className='flex gap-1 text-primary items-center'>
                                {Array.from({ length: 5 }).map((_, index) => (<FaStar key={index} />))}
                                <span className='text-gray-800'>({singleFood.reviewCount} reviews)</span>
                            </div>
                            <Image src={singleFood.image} alt={singleFood.name} width={450} height={250} className='w-64 h-40 my-2 rounded-md block md:hidden' />
                            <h2 className='text-xl md:text-3xl font-semibold'>{singleFood.name}</h2>
                            <h5 className='flex items-center gap-1 font-semibold text-green-600'><FaCheckCircle /> In Stock</h5>
                            <Link href={`/restaurants/${singleFood.restaurant?.toLocaleLowerCase()}`} className='flex items-center gap-1 font-semibold hover:text-primary'><FaShop />{singleFood.restaurant}</Link>
                            <h3 className='text-2xl font-semibold text-primary'>${singleFood.price}</h3>
                            <h5 className='font-semibold'>Product Details</h5>
                            <p>{singleFood.description}</p>
                            {/* //Action Buttons */}
                            <div className='flex gap-2 items-center'>
                                {/* <button
                                    onClick={() => handleAddToCart(singleFood?._id)}
                                    className='flex gap-2 items-center bg-primary text-white py-2 px-5 rounded-md my-3 hover:bg-secondary duration-300 ease-in-out'><FaCartShopping />Add to Cart</button> */}
                                <AddToCartBtn prodId={singleFood?._id} />
                                <button
                                    onClick={() => handleAddToWishlist(singleFood?._id)}
                                    className='flex gap-2 items-center border-2 border-primary text-primary py-[6px] px-5 rounded-md my-3 hover:bg-primary hover:text-white duration-300 ease-in-out'><FaHeart />Wishlist</button>
                            </div>
                        </div>
                    </div>
                    {/* Product Reviews */}
                    <h2 className='text-lg md:text-xl font-semibold text-primary border-l-4 border-primary pl-2 mt-5'>Reviews</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mt-5'>
                        {
                            reviews?.map((review: ReviewData) => <ReviewCard
                                key={review._id}
                                review={review} />)
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default SingleFoodCard;