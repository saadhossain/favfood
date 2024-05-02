import FoodCard from '@/app/lib/models/FoodCard';
import { fetchFoodData } from '@/app/utils/fetchFoodData';

const DisplayFoods = async () => {
    const foods = await fetchFoodData();
    // console.log(foods);
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-5 my-5'>
            {
                foods.map((food) => <FoodCard key={food._id} food={food} />)
            }
        </div>
    );
};

export default DisplayFoods;