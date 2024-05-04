const ProductLoader = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 my-5'>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                    {<div className='bg-gray-200 rounded-md h-56 md:h-[320px] max-w-[400px] animate-pulse'>
                        <div className='max-w-[400px] h-28 md:h-44 bg-gray-300 routed-t-md animate-pulse'></div>
                        <div className='flex flex-col gap-4 md:gap-5 justify-between p-2 md:p-4'>
                            {/* Title and Rating Row */}
                            <div className='flex items-start justify-between gap-5'>
                                <div className='w-9/12 h-4 md:h-5 rounded-md bg-gray-300 animate-pulse'></div>
                                <div className='w-3/12 h-4 md:h-5 rounded-md bg-gray-300 animate-pulse'></div>
                            </div>
                            {/* Restaurant and Sold Item Row */}
                            <div className='flex items-start justify-between gap-5'>
                                <div className='w-5/12 h-4 md:h-5 rounded-md bg-gray-300 animate-pulse'></div>
                                <div className='w-3/12 h-4 md:h-5 rounded-md bg-gray-300 animate-pulse'></div>
                            </div>

                            <div className='flex items-start justify-between gap-5'>
                                <div className='w-4/12 h-4 md:h-5 rounded-md bg-gray-300 animate-pulse'></div>
                                <div className='w-2/5 h-6 md:h-8 rounded-md bg-gray-300 animate-pulse'></div>
                            </div>
                        </div>
                    </div>}
                </div>
            ))}
        </div>
    );
};

export default ProductLoader;