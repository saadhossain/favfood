import { configureStore } from '@reduxjs/toolkit'
import adminDataReducer from './features/adminDataSlice'
import { dataApiSlice } from './features/api/apiSlice'
import cartReducer from './features/cartSlice'
import commonFeaturesReducer from './features/commonFeaturesSlice'
import foodReducer from './features/foodSlice'
import formReducer from './features/formSlice'
import searchReducer from './features/searchSlice'
import wishlistReducer from './features/wishlistSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      adminData: adminDataReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      search: searchReducer,
      food: foodReducer,
      form: formReducer,
      commonFeatures: commonFeaturesReducer,
      [dataApiSlice.reducerPath]: dataApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(dataApiSlice.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']