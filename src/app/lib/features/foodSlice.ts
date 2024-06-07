import { FoodData } from '@/app/types/DataTypes';
import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
    foods: FoodData[];
    tabQuery: string
}
const initialState: InitialState = {
    foods: [],
    tabQuery: 'all-food'
}

export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        setFoods: (state, action) => {
            state.foods = action.payload
        },
        setTabQuery: (state, action) => {
            state.tabQuery = action.payload
        }
    }
})

export const { setFoods, setTabQuery } = foodSlice.actions;

export default foodSlice.reducer;