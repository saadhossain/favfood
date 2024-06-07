import { createSlice } from '@reduxjs/toolkit';

export interface initialState {
    adminData: any[];
    initialData: any[];
}

const initialState = {
    adminData: [],
    initialData: []
}

export const adminDataSlice = createSlice({
    name: 'adminData',
    initialState,
    reducers: {
        setAdminData: (state, action) => {
            state.adminData = action.payload;
        },
        setInitialData: (state, action) => {
            state.initialData = action.payload;
        }
    }
})

export const { setAdminData, setInitialData } = adminDataSlice.actions;
export default adminDataSlice.reducer