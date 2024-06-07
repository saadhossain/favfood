import { createSlice } from '@reduxjs/toolkit';

export interface initialState {
    paymentMethod: string,
    showPassword: boolean,
    openAddressBoxModal: boolean,
    openOrderEditModal: boolean,
    openUserEditModal: boolean,
    openAddReviewModal: boolean,
    openEditReviewModal: boolean,
    singleDataId: string

}

const initialState = {
    paymentMethod: '',
    showPassword: true,
    openAddressBoxModal: false,
    openOrderEditModal: false,
    openUserEditModal: false,
    openAddReviewModal: false,
    openEditReviewModal: false,
    singleDataId: ''
}

export const commonFeaturesSlice = createSlice({
    name: 'commonFeatures',
    initialState,
    reducers: {
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
        },
        setShowPassword: (state) => {
            state.showPassword = !state.showPassword
        },
        setOpenAddressBoxModal: (state) => {
            state.openAddressBoxModal = !state.openAddressBoxModal
        },
        setOpenOrderEditModal: (state) => {
            state.openOrderEditModal = !state.openOrderEditModal
        },
        setOpenUserEditModal: (state) => {
            state.openUserEditModal = !state.openUserEditModal
        },
        setOpenAddReviewModal: (state) => {
            state.openAddReviewModal = !state.openAddReviewModal
        },
        setOpenEditReviewModal: (state) => {
            state.openEditReviewModal = !state.openEditReviewModal
        },
        setSingleDataId: (state, action) => {
            state.singleDataId = action.payload
        }
    }
})

export const { setPaymentMethod, setShowPassword, setOpenAddressBoxModal, setOpenOrderEditModal, setOpenUserEditModal, setOpenAddReviewModal, setOpenEditReviewModal, setSingleDataId } = commonFeaturesSlice.actions;

export default commonFeaturesSlice.reducer;