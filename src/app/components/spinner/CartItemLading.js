
const CartItemLading = () => {
    return (
        <div className='mx-5'>
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between text-center border-b border-opacity-20 border-gray-500 bg-gray-100 p-3">
                    {/* Remove Button */}
                    <div className='animate-pulse bg-gray-300 py-2 px-4 rounded-md'></div>
                    {/* Image */}
                    <div className='animate-pulse w-16 h-10 rounded-md bg-gray-300'> </div>
                    {/* Title */}
                    <div className='animate-pulse bg-gray-300 py-2 px-20'></div>
                    {/* Price */}
                    <div className='animate-pulse bg-gray-300 py-2 px-6'></div>
                    {/* Quantity */}
                    <div className='animate-pulse flex gap-1 items-center justify-center'>
                        <div className='animate-pulse bg-gray-300 p-2'></div>
                        <div className='animate-pulse bg-gray-300 py-2 px-4'></div>
                        <div className='animate-pulse bg-gray-300 p-2'></div>
                    </div>
                    {/* Subtotal */}
                    <div className='animate-pulse bg-gray-300 py-2 px-6'></div>
                </div>
            ))}
        </div>
    );
};

export default CartItemLading;