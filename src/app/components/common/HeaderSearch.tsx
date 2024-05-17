'use client'
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";

const HeaderSearch = () => {
    const { loading, setLoading, setSearchedFoods, searchText, setSearchText } = useContext(DataContext) as DataContextType;
    const route = useRouter();
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const searchtext = form.searchtext.value;
        setSearchText(searchtext);
        form.reset();
        route.push('/foods/search');
    };
    //fetch the searched food from the api
    useEffect(() => {
        const getSearchFoods = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/foods/search?query=${searchText}`, { cache: 'no-store' });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { result } = await res.json();
                setSearchedFoods(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        getSearchFoods();

    }, [setLoading, searchText]);
    return (
        <div className='w-2/5 hidden md:block'>
            <form
                onSubmit={handleSearch}
                className='border-2 border-gray-200 px-4 flex gap-3 items-center w-full h-10 rounded-3xl'
            >
                <input type="text" name="searchtext" className='bg-transparent focus:outline-none w-full text-gray-500' placeholder='What would you like to eat?' />
                <button type='submit'>
                    {
                        loading
                            ? <div className="w-5 h-5 border-2 border-dashed border-gray-400 rounded-full animate-spin"></div>
                            : <FaSearch className='text-gray-400 h-6 w-6' />
                    }
                </button>
            </form>
        </div>
    );
};

export default HeaderSearch;