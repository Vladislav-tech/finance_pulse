import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionCategory, TransactionType } from '../utils/types';

interface InitialStateInterface {
  transactions: Transaction[];
  amount: number
}

const initialState: InitialStateInterface = {
  transactions: [
    {
        id: 1,
        title: 'Lunch',
        date: new Date(),
        category: TransactionCategory.FOOD,
        type: TransactionType.EXPENSE,
        amount: 100
      },
      {
        id: 2,
        title: 'Salary',
        date: new Date(),
        category: TransactionCategory.SALARY,
        type: TransactionType.INCOME,
        amount: 125000
      }
  ],
  amount: 125100
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
      state.transactions = state.transactions.filter(
        (transaction: Transaction) => transaction.id !== id,
      );
    },
  },
});

export const { addTransaction, removeTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
