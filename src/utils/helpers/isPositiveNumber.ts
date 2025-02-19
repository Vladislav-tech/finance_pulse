/**
 * Check if value is positive number
 * 
 * @param str - string to check
 * @returns boolean
 * 
 * @example
 * ```typescript
 * isPositiveNumber("42");      // true
 * isPositiveNumber("3.14");    // true
 * isPositiveNumber(".5");      // true
 * isPositiveNumber("0");       // false
 * isPositiveNumber("-1");      // false
 * isPositiveNumber("abc");     // false
 * ```
 */
function isPositiveNumber(str: string): boolean {
  return /^(\d+\.\d+|\.\d+|\d+)$/.test(str) && parseFloat(str) > 0;
}

export default isPositiveNumber;