
const TableSkeletonLoader = () => {
    return (
        <div className='mx-0 md:mx-5'>
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between gap-1 md:gap-3 text-center border-b border-opacity-20 border-gray-500 bg-gray-100 p-3">
                    {/* Remove Button */}
                    <div className='animate-pulse bg-gray-300 py-4 md:py-2 px-1 md:px-4 rounded-md'></div>
                    {/* Image */}
                    <div className='animate-pulse w-16 h-10 rounded-md bg-gray-300'> </div>
                    {/* Title */}
                    <div className='animate-pulse bg-gray-300 py-2 px-20 rounded-md'></div>
                    {/* Price */}
                    <div className='animate-pulse bg-gray-300 py-2 px-6 rounded-md'></div>
                    {/* Quantity */}
                    <div className='animate-pulse md:flex gap-1 items-center justify-center hidden'>
                        <div className='animate-pulse bg-gray-300 p-2 rounded-md'></div>
                        <div className='animate-pulse bg-gray-300 py-2 px-4 rounded-md'></div>
                        <div className='animate-pulse bg-gray-300 p-2 rounded-md'></div>
                    </div>
                    {/* Subtotal */}
                    <div className='animate-pulse bg-gray-300 py-3 md:py-2 px-6 rounded-md'></div>
                </div>
            ))}
        </div>
    );
};

export default TableSkeletonLoader;