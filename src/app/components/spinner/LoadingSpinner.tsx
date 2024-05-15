
const LoadingSpinner = () => {
    return (
        <div className='w-10/12 mx-auto my-5 min-h-[60vh] flex flex-col justify-center items-center gap-5 text-center'>
            <div className="w-14 h-14 border-4 border-dashed border-primary rounded-full animate-spin"></div>
            <div>
                <h3 className='text-xl font-semibold'>Data Fetching</h3>
                <h4 className='font-semibold'>Please Wait....</h4>
            </div>
        </div>
    );
};

export default LoadingSpinner;