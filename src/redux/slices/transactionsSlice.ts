import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../../utils/types';

interface InitialStateInterface {
  transactions: Transaction[];
  amount: number;
}

const initialState: InitialStateInterface = {
  transactions: [
    {
      id: 1,
      title: 'Lunch',
      date: new Date().toLocaleDateString(),
      category: 'Food',
      type: 'expense',
      amount: -1200,
    },
    {
      id: 2,
      title: 'Salary',
      date: new Date().toLocaleDateString(),
      category: 'Salary',
      type: 'income',
      amount: 125000,
    },
    {
      id: 3,
      title: 'Dinner',
      date:new Date().toLocaleDateString(),
      category: 'Food',
      type: 'expense',
      amount: -5000,
    },
    {
      id: 4,
      title: 'Transport',
      date: new Date().toLocaleDateString(),
      category: 'Transport',
      type: 'expense',
      amount: -3300,
    },
  ],
  amount: 115500,

};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.amount += action.payload.amount;
      state.transactions.push(action.payload);
    },
    removeTransaction(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.transactions = state.transactions.filter((transaction: Transaction) => {
        if (transaction.id !== id) {
          return true;
        }
        state.amount -= transaction.amount;
        return false;
      });
    },
  },
});

export const { addTransaction, removeTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
