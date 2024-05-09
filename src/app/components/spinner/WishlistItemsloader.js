
const WishlistItemsloader = () => {
    return (
        <div className='bg-gray-100 rounded-md'>
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className='flex items-center justify-between border-b-2 border-gray-200 py-2 px-5 text-gray-800'>
                    <div className='py-3 px-2 bg-gray-200 animate-pulse'></div>
                    <div className='bg-gray-200 w-16 h-10 animate-pulse rounded-md'></div>
                    <div className='bg-gray-200 w-48 py-2 animate-pulse'></div>
                    <div className='bg-gray-200 w-10 py-2 animate-pulse'></div>
                    <div className='bg-gray-200 w-16 py-2 animate-pulse'></div>
                    <div className='bg-gray-200 w-40 py-4 animate-pulse rounded-md'></div>
                </div>
            ))}
        </div>
    );
};

export default WishlistItemsloader;