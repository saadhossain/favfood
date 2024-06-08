import { createSlice } from '@reduxjs/toolkit';

export interface initialState {
    paymentMethod: string,
    showPassword: boolean,
    openAddressBoxModal: boolean,
    openOrderEditModal: boolean,
    openUserEditModal: boolean,
    openAddReviewModal: boolean,
    openEditReviewModal: boolean,
    singleDataId: string,
    openEditFoodModal: boolean,
    openEditRestaurantModal: boolean,

}

const initialState = {
    paymentMethod: '',
    showPassword: true,
    openAddressBoxModal: false,
    openOrderEditModal: false,
    openUserEditModal: false,
    openAddReviewModal: false,
    openEditReviewModal: false,
    singleDataId: '',
    openEditFoodModal: false,
    openEditRestaurantModal: false
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
        },
        setOpenEditFoodModal: (state) => {
            state.openEditFoodModal = !state.openEditFoodModal
        },
        setOpenEditRestaurantModal: (state) => {
            state.openEditRestaurantModal = !state.openEditRestaurantModal
        }
    }
})

export const { setPaymentMethod, setShowPassword, setOpenAddressBoxModal, setOpenOrderEditModal, setOpenUserEditModal, setOpenAddReviewModal, setOpenEditReviewModal, setSingleDataId, setOpenEditFoodModal, setOpenEditRestaurantModal } = commonFeaturesSlice.actions;

export default commonFeaturesSlice.reducer;