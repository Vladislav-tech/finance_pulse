import { configureStore } from '@reduxjs/toolkit';
import transactionsSlice from './slices/transactionsSlice';
import filterSlice from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsSlice,
    filter: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
