import { FoodData } from '@/app/types/DataTypes'
import { createSlice } from '@reduxjs/toolkit'

export interface initialState {
    searchText: string,
    searchedFoods: FoodData[],
    isSearchModalOpen: boolean,
}
const initialState: initialState = {
    searchText: '',
    searchedFoods: [],
    isSearchModalOpen: false
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        setSearchedFoods: (state, action) => {
            state.searchedFoods = action.payload
        },
        setIsSearchModalOpen: (state) => {
            state.isSearchModalOpen = !state.isSearchModalOpen
        }
    }
})

export const { setSearchText, setSearchedFoods, setIsSearchModalOpen } = searchSlice.actions
export default searchSlice.reducer