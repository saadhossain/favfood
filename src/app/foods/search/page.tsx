'use client'
import SubHeading from '@/app/components/shared/headings/SubHeading'
import SearchedFoodCard from '@/app/components/ui/searchPage/SearchedFoodCard'
import { DataContext } from '@/app/context/DataContext'
import { DataContextType } from '@/app/types/DataContextTypes'
import { FoodData } from '@/app/types/DataTypes'
import { useContext } from 'react'

const FoodSearch = () => {
    const { searchedFoods, searchText } = useContext(DataContext) as DataContextType;
    console.log(searchedFoods);
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-2 md:my-5'>
            {
                (searchedFoods && searchedFoods.length > 0) ? <SubHeading heading={`Search Result for "${searchText}"`} /> : <SubHeading heading={`No Foods Found. Please make a search...`} />
            }
            {/* Display Search foods */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
                {searchedFoods?.map((food: FoodData) => <SearchedFoodCard
                    key={food._id}
                    food={food}
                />)}
            </div>
        </div>
    )
}

export default FoodSearch