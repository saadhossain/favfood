'use client'
import { DataContext } from '@/app/context/DataContext'
import { DataContextType } from '@/app/types/DataContextTypes'
import { useRouter } from 'next/navigation'
import { FormEvent, useContext, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchModal = () => {
    const { setSearchedFoods, searchText, setSearchText, isSearchModalOpen, setIsSearchModalOpen } = useContext(DataContext) as DataContextType;
    const route = useRouter();
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const searchtext = form.searchtext.value;
        setSearchText(searchtext);
        form.reset();
        setIsSearchModalOpen(false);
        route.push('/foods/search');
    };
    //fetch the searched food from the api
    useEffect(() => {
        const getSearchFoods = async () => {
            try {
                const res = await fetch(`/api/foods/search?query=${searchText}`, { cache: 'no-store' });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { result } = await res.json();
                setSearchedFoods(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getSearchFoods();

    }, [searchText]);
    return (
        <>
            {
                isSearchModalOpen && <div className={`w-full h-screen flex items-center justify-center absolute left-0 top-0 z-50 bg-gray-900 bg-opacity-40`}>
                    <div className='w-11/12 md:w-2/4 h-48 flex items-center bg-gray-700 text-white px-5 rounded-md relative'>
                        <button
                            onClick={() => setIsSearchModalOpen(false)}
                            className='font-bold text-xl absolute top-1 right-2 bg-gray-900 bg-opacity-60 py-1 px-3 rounded-full'>X</button>
                        <form
                            onSubmit={handleSearch}
                            className='border-2 border-white px-4 flex gap-3 items-center w-full h-10 rounded-3xl'
                        >
                            <input type="text" name="searchtext" className='bg-transparent focus:outline-none w-full' placeholder='Food, Category or Restaurant' />
                            <button type='submit'>
                                <FaSearch className='h-6 w-6' />
                            </button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default SearchModal