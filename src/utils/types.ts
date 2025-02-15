export enum TransactionCategory {
  FOOD = 'Food',
  SALARY = 'Salary',
  SHOPPING = 'Shopping',
  TRANSPORT = 'Transport',
  OTHER = 'Other',
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: number;
  date: Date;
  title: string;
  type: string;
  category: TransactionCategory;
  amount: number;
}
