export const fetchFoodData = async () => {
    const res = await fetch('http://localhost:3000/api/foods', { next: { revalidate: 300 } });
    const { foods } = await res.json();
    return foods;
};