import { configureStore } from '@reduxjs/toolkit'
import { dataApiSlice } from './features/api/apiSlice'
import cartReducer from './features/cartSlice'
import commonFeaturesReducer from './features/commonFeaturesSlice'
import foodReducer from './features/foodSlice'
import searchReducer from './features/searchSlice'
import userDataReducer from './features/userDataSlice'
import wishlistReducer from './features/wishlistSlice'

export const store = configureStore({
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

store.subscribe(() => {
  const { productsInCart } = store.getState().cart;
  try {
    localStorage.setItem('cart', JSON.stringify(productsInCart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
});

// Infer the type of makeStore
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];