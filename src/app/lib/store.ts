import { configureStore } from '@reduxjs/toolkit'
import { dataApiSlice } from './features/api/apiSlice'
import cartReducer from './features/cartSlice'
import commonFeaturesReducer from './features/commonFeaturesSlice'
import foodReducer from './features/foodSlice'
import searchReducer from './features/searchSlice'
import userDataReducer from './features/userDataSlice'
import wishlistReducer from './features/wishlistSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      userData: userDataReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      search: searchReducer,
      food: foodReducer,
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