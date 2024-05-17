import FoodCard from '@/app/components/ui/homecomp/FoodCard';
import { FoodData } from '@/app/types/DataTypes';
import { fetchFoodData } from '@/app/utils/fetchFoodData';
import { useState } from 'react';
import ProductLoader from '../../spinner/ProductLoader';
const DisplayFoodData = ({ tabQuery, loading }: { tabQuery: string, loading: boolean }) => {
    const [page, setPage] = useState(1);
    //Get the foods data...
    const foods = fetchFoodData(tabQuery, page);
    // console.log(foods);
    if (loading) {
        return <ProductLoader />;
    }
    return (
        <>
            {
                foods && <div className='flex flex-col items-center justify-center'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 my-5'>
                        {
                            foods.map((food: FoodData) => <FoodCard key={food._id} food={food} />)
                        }
                    </div>
                    <button
                    className='bg-primary text-white hover:bg-secondary py-2 px-5 rounded-md'
                    onClick={() => setPage(prevPage => prevPage + 1)}
                >
                    Load More
                </button>
                </div>
            }
        </>
    );
};

export default DisplayFoodData;