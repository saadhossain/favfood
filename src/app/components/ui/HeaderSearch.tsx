import { FormEvent } from 'react';
import { FaSearch } from "react-icons/fa";

const HeaderSearch = () => {
    const handleSearch = (e:FormEvent) => {
        e.preventDefault();
    };
    return (
        <div className='w-2/5 hidden md:block'>
            <form
                onSubmit={handleSearch}
                className='border-2 border-gray-200 px-4 flex gap-3 items-center w-full h-10 rounded-3xl'
            >
                <input type="text" name="searchtext" className='bg-transparent focus:outline-none w-full text-gray-500' placeholder='What would you like to eat?' />
                <button type='submit'><FaSearch className='text-gray-400 h-6 w-6' /></button>
            </form>
        </div>
    );
};

export default HeaderSearch;