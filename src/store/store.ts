import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import loadingReducer from '../features/loadingSlice';
import orderReducer from '../features/orderSlice';
import productsReducer from '../features/productSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, 
    products: productsReducer,
    cart:cartReducer,
    loading: loadingReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
