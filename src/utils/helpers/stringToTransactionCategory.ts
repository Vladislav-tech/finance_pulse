import { TransactionCategory } from '../types';

export function stringToTransactionCategory(category: string): TransactionCategory {
  switch (category) {
    case 'Other':
      return TransactionCategory.OTHER;
    case 'Food':
      return TransactionCategory.FOOD;
    case 'Transport':
      return TransactionCategory.TRANSPORT;
    case 'Shopping':
      return TransactionCategory.SHOPPING;
    case 'Salary':
      return TransactionCategory.SALARY;
    default:
      throw new Error(`Unknown category: ${category}`);
  }
}