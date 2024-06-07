import { configureStore } from '@reduxjs/toolkit'
import adminDataReducer from './features/adminData/adminDataSlice'
import { dataApiSlice } from './features/api/apiSlice'
import cartReducer from './features/cart/cartSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      adminData: adminDataReducer,
      cart: cartReducer,
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