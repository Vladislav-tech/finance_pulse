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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  date: any;
  title: string;
  type: string;
  category: string;
  amount: number;
}
