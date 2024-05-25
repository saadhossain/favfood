'use client'

import LoadingSpinner from '@/app/components/spinner/LoadingSpinner'
import SearchedFoodCard from '@/app/components/ui/searchPage/SearchedFoodCard'
import { DataContext } from '@/app/context/DataContext'
import { DataContextType } from '@/app/types/DataContextTypes'
import { FoodData } from '@/app/types/DataTypes'
import { useContext, useEffect, useState } from 'react'

interface Props {
    params: {
        categoryName: string
    }
}

const SingleCategoryFoods = ({ params }: Props) => {
    const categoryName = params.categoryName;
    const { loading, setLoading } = useContext(DataContext) as DataContextType;
    //Get the category based foods from the api
    const [categoryFoods, setCategoryFoods] = useState([]);
    useEffect(() => {
        const getSearchFoods = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/foods/search?query=${categoryName}`, { cache: 'no-store' });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { result } = await res.json();
                setCategoryFoods(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        getSearchFoods();

    }, [categoryName]);
    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-5'>
            {/* Display Search foods */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
                {categoryFoods?.map((food: FoodData) => <SearchedFoodCard
                    key={food._id}
                    food={food}
                />)}
            </div>
        </div>
    )
}

export default SingleCategoryFoods