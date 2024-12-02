
const OldReviewsTable = () => {
    return (
        <div><table className="min-w-full">
            <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
            </colgroup>
            <thead className="bg-gray-300">
                <tr className="text-center">
                    {/* Product Remove Button */}
                    <th className="p-3 text-left">Description</th>
                    <th className="md:p-3">Rating</th>
                    <th className="p-3">Review For</th>
                    <th>Rated By</th>
                    <th className="p-3">Restaurant</th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    reviews?.map((review: any) => <tr
                        key={review._id}
                        className="text-center border-b-2 border-gray-200">
                        {/* Product Image and product name */}
                        <th className="md:p-3 p-2 text-justify font-normal text-md min-w-72 md:min-w-0">
                            {review?.description?.length > 100 ? review.description.slice(0, 100) + '...' : review.description}
                        </th>
                        <th className="md:p-3 p-2">{review.rating}</th>
                        <th className="md:p-3 p-2 min-w-60 md:min-w-0">
                            {review.foodSlug}
                        </th>
                        <th className="md:p-3 p-2 min-w-36 md:min-w-0">
                            {review.userName}
                        </th>
                        <th className="md:p-3 p-2 min-w-36 md:min-w-0">
                            {review?.restaurantName}
                        </th>
                        {/* Restaurant Action Buttons */}
                        <th className="p-3">
                            <div className='flex gap-1 items-center justify-center'>
                                <TiDelete
                                    onClick={() => handleDeleteReview(review._id)}
                                    className='w-8 h-8 cursor-pointer text-red-500' title='Delete Review'
                                />
                                <TbEdit
                                    className='w-6 h-6 cursor-pointer text-green-600' title='Edit Review'
                                    onClick={() => {
                                        dispatch(setOpenEditReviewModal())
                                        dispatch(setSingleDataId(review._id))
                                    }}
                                />
                            </div>
                        </th>
                    </tr>)
                }
            </tbody>
        </table></div>
    )
}

export default OldReviewsTable