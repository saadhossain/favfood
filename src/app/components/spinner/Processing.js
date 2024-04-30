
const Processing = ({ title }) => {
    return (
        <div className='flex gap-2 items-center font-semibold'>
            <div className="w-5 h-5 border-2 border-dashed border-white rounded-full animate-spin"></div>
            {title}
        </div>
    );
};

export default Processing;