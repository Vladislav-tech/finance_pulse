import { faUtensils, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

/**
 * Returns the corresponding FontAwesome icon for a given category.
 * 
 * @param category - The category for which to retrieve the icon. Supported categories are:
 *   - `'Food'`: Returns a utensils icon.
 *   - `'Transport'`: Returns a car icon.
 *   - `'Shopping'`: Returns a shopping bag icon.
 *   - `'Salary'`: Returns a money bill trend-up icon.
 *   - `'Other'`: Returns a wallet icon.
 * 
 * @returns The FontAwesome `IconDefinition` corresponding to the provided category.
 *          If the category is not found, a wallet icon is returned as the default,
 *          and a warning is logged to the console.
 * 
 * @example
 * ```typescript
 * getCategoryIcon('Food');      // Returns the utensils icon
 * getCategoryIcon('Transport'); // Returns the car icon
 * getCategoryIcon('Unknown');   // Logs a warning and returns the wallet icon
 * ```
 */
function getCategoryIcon(category: string): IconDefinition {
  switch (category) {
    case 'Food':
      return faUtensils;
    case 'Transport':
      return faCar;
    case 'Shopping':
      return faBagShopping;
    case 'Salary':
      return faMoneyBillTrendUp;
    case 'Other':
      return faWallet;
    default:
      console.log('category not found ', category);
      return faWallet;
  }
}

export default getCategoryIcon;
