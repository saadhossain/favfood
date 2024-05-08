const CartSummeryLoader = () => {
    return (
        <div className='flex flex-col gap-4 p-4 bg-gray-100'>
            {/* Discount Code */}
            <div>
                <div className='bg-gray-200 py-2 w-8/12 animate-pulse'></div>
                <div className='bg-gray-200 py-4 w-full rounded-md my-2 animate-pulse' />
            </div>
            {/* Subtotal */}
            <div className='flex items-center justify-between'>
                <div className='bg-gray-200 py-3 w-2/4 animate-pulse'></div>
                <div className='bg-gray-200 py-3 w-1/5 animate-pulse'></div>
            </div>
            {/* Discount Amount */}
            <div className='flex items-center justify-between'>
                <div className='bg-gray-200 py-3 w-5/12 animate-pulse'></div>
                <div className='bg-gray-200 py-3 w-1/5 animate-pulse'></div>
            </div>
            {/* Tax Amount */}
            <div className='flex items-center justify-between'>
                <div className='bg-gray-200 py-3 w-2/4 animate-pulse'></div>
                <div className='bg-gray-200 py-3 w-1/5 animate-pulse'></div>
            </div>
            <hr className='border-t-2 border-gray-500 animate-pulse' />

            {/* Grand Total */}
            <div className='flex items-center justify-between'>
                <div className='bg-gray-200 py-3 w-2/4 animate-pulse'></div>
                <div className='bg-gray-200 py-3 w-3/12 animate-pulse'></div>
            </div>
            <div className='bg-gray-200 py-5 rounded-md w-full animate-pulse'></div>
        </div>
    );
};

export default CartSummeryLoader;