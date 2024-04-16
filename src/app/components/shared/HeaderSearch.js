import { FaSearch, FaWindowClose } from "react-icons/fa";

const HeaderSearch = ({ hideSearch, setHideSearch }) => {
    const handleSearch = (e) => {
        e.preventDefault();
        setHideSearch(!hideSearch);

    };
    return (
        <div className={`w-full absolute duration-300 ease-in-out ${hideSearch && 'hidden'} ${!hideSearch ? '-top-3 right-0' : 'top-[-99px]'}`}>
            <form
                onSubmit={handleSearch}
                className='bg-lt_gray shadow-lg p-2 flex gap-3 items-center w-full h-12 border-2 border-primary rounded-md'
            >
                <button type='submit'><FaSearch className='text-[#9CA3BE] h-6 w-6' /></button>
                <input type="text" name="searchtext" className='bg-transparent focus:outline-none w-full' placeholder='What would you like to eat?' />
                <FaWindowClose onClick={() => setHideSearch(!hideSearch)} className='text-[#9CA3BE] h-6 w-6' />
            </form>
        </div>
    );
};

export default HeaderSearch;