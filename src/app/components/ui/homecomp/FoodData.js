import FoodCard from '@/app/components/ui/homecomp/FoodCard';
import { fetchFoodData } from '@/app/utils/fetchFoodData';
import ProductLoader from '../../spinner/ProductLoader';
const FoodData = ({ tabQuery, loading }) => {
    const foods = fetchFoodData(tabQuery);
    // console.log(foods);
    if (loading) {
        return <ProductLoader/>;
    }
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 my-5'>
            {
                foods && foods.map((food) => <FoodCard key={food._id} food={food} />)
            }
        </div>
    );
};

export default FoodData;