import { createSlice } from '@reduxjs/toolkit';

export interface initialState {
    userData: any[];
    initialData: any[];
}

const initialState = {
    userData: [],
    initialData: []
}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setInitialData: (state, action) => {
            state.initialData = action.payload;
        }
    }
})

export const { setUserData, setInitialData } = userDataSlice.actions;
export default userDataSlice.reducer