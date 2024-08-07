'use client'
import { setIsSearchModalOpen, setSearchText, setSearchedFoods } from '@/app/lib/features/searchSlice'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchModal = () => {
    const dispatch = useAppDispatch();
    const { searchText, isSearchModalOpen } = useAppSelector((state) => state.search)
    const route = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    //Handle Search Functionality
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const searchtext = form.searchtext.value;
        dispatch(setSearchText(searchtext));
        form.reset();
        dispatch(setIsSearchModalOpen())
        route.push('/foods/search');
    };
    //fetch the searched food from the api based on the searchText
    useEffect(() => {
        const getSearchFoods = async () => {
            try {
                const res = await fetch(`/api/foods/search?query=${searchText}`, {
                    next: {
                        revalidate: 3600
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { result } = await res.json();
                dispatch(setSearchedFoods(result));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getSearchFoods();

    }, [searchText]);

    //Make search input field active by default when modal is opened.
    useEffect(() => {
        if (isSearchModalOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchModalOpen]);
    return (
        <>
            {
                isSearchModalOpen && <div className={`w-full min-h-screen flex items-center justify-center fixed left-0 top-0 z-50 bg-gray-900 bg-opacity-60`}>
                    <div className='w-11/12 md:w-2/4 h-48 flex items-center bg-gray-700 text-white px-5 rounded-md relative'>
                        <button
                            onClick={() => dispatch(setIsSearchModalOpen())}
                            className='font-bold text-xl absolute top-1 right-2 bg-gray-900 bg-opacity-60 py-1 px-3 rounded-full'>X</button>
                        <form
                            onSubmit={handleSearch}
                            className='border-2 border-white px-4 flex gap-3 items-center w-full h-10 rounded-3xl'
                        >
                            <input type="text" name="searchtext"
                                ref={inputRef}
                                className='bg-transparent focus:outline-none w-full' placeholder='Food, Category or Restaurant' />
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