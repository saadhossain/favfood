import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
    formData: any | {}
}
const initialState = {
    formData: {}
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            const { name, value } = action.payload;
            state.formData = { ...state.formData, [name]: value }
        }
    }
})

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;