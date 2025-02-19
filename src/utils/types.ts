/**
 * Represents the category of a transaction.
 *
 * - `'Food'`: Transactions related to food expenses.
 * - `'Salary'`: Transactions related to income from salary.
 * - `'Shopping'`: Transactions related to shopping expenses.
 * - `'Transport'`: Transactions related to transportation expenses.
 * - `'Other'`: Transactions that do not fit into the other categories.
 */
export type TransactionCategory = 'Food' | 'Salary' | 'Shopping' | 'Transport' | 'Other';

/**
 * Represents the type of a transaction.
 *
 * - `'income'`: A transaction that adds to the balance (e.g., salary).
 * - `'expense'`: A transaction that subtracts from the balance (e.g., shopping).
 */
export type TransactionType = 'income' | 'expense';

/**
 * Represents a financial transaction.
 */
export interface Transaction {
  /**
   * A unique identifier for the transaction.
   */
  id: number;

  /**
   * The date of the transaction.
   */
  date: string;

  /**
   * A brief description or title of the transaction.
   */
  title: string;

  /**
   * The type of the transaction (income or expense).
   */
  type: TransactionType;

  /**
   * The category of the transaction (e.g., Food, Salary, etc.).
   */
  category: TransactionCategory;

  /**
   * The monetary amount of the transaction.
   */
  amount: number;
}
