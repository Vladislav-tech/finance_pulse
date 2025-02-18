// export enum TransactionCategory {
//   FOOD = 'Food',
//   SALARY = 'Salary',
//   SHOPPING = 'Shopping',
//   TRANSPORT = 'Transport',
//   OTHER = 'Other',
// }

// export enum TransactionType {
//   INCOME = 'income',
//   EXPENSE = 'expense',
// }

// type TransactionCategory = 

export interface Transaction {
  id: number;
  date: string;
  title: string;
  type: string;
  category: string;
  amount: number;
}
