'use client'

import LoadingSpinner from '@/app/components/spinner/LoadingSpinner'
import SearchedFoodCard from '@/app/components/ui/searchPage/SearchedFoodCard'
import { DataContext } from '@/app/context/DataContext'
import { DataContextType } from '@/app/types/DataContextTypes'
import { FoodData } from '@/app/types/DataTypes'
import { useContext, useEffect, useState } from 'react'


const DisplayCatFoods = ({ catName }: { catName: string }) => {
    const { loading, setLoading } = useContext(DataContext) as DataContextType;
    //Get the category based foods from the api
    const [categoryFoods, setCategoryFoods] = useState([]);
    useEffect(() => {
        const getSearchFoods = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/foods/search?query=${catName}`, {
                    next: {
                        revalidate: 3600
                    }
                });
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

    }, [catName]);
    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
            {categoryFoods?.map((food: FoodData) => <SearchedFoodCard
                key={food._id}
                food={food}
            />)}
        </div>
    )
}

export default DisplayCatFoods