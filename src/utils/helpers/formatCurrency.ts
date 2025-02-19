/**
 * Formats a number as a currency string using Russian locale formatting rules.
 * 
 * @param amount - The numeric value to format as a currency string.
 * 
 * @returns A string representing the formatted number with two decimal places,
 *          using Russian locale conventions (e.g., `1,234.56`).
 * 
 * @example
 * ```typescript
 * formatCurrency(1234.56);  // Returns "1 234,56"
 * formatCurrency(1000);     // Returns "1 000,00"
 * formatCurrency(0.99);     // Returns "0,99"
 * ```
 */
function formatCurrency(amount: number): string {
  return amount.toLocaleString('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default formatCurrency;