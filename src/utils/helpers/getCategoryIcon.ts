import {
  faUtensils,
  faCar,
  faBagShopping,
  faMoneyBillTrendUp,
  faWallet,
  faGamepad,
  faNotesMedical,
  faMoneyBillTransfer,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { TransactionCategory } from '../types';

/**
 * Returns the corresponding FontAwesome icon for a given financial category.
 *
 * @param category - The financial category for which to retrieve the icon. Supported categories are:
 *   - `'Food'`: Utensils icon 
 *   - `'Transport'`: Car icon 
 *   - `'Shopping'`: Shopping bag icon 
 *   - `'Salary'`: Money bill with upward trend icon 
 *   - `'Entertainment'`: Gamepad icon 
 *   - `'Health'`: Medical notes icon 
 *   - `'Taxes'`: Money transfer icon 
 *   - `'Other'`: Default wallet icon 
 *
 * @returns The FontAwesome `IconDefinition` corresponding to the provided category.
 *          Returns wallet icon and logs a warning for unrecognized categories.
 *
 * @example
 * ```typescript
 * // Returns utensils icon
 * getCategoryIcon('Food');
 *
 * // Returns car icon
 * getCategoryIcon('Transport');
 *
 * // Returns gamepad icon
 * getCategoryIcon('Entertainment');
 *
 * // Returns wallet icon and logs warning
 * getCategoryIcon('Unknown');
 * ```
 */
function getCategoryIcon(category: TransactionCategory): IconDefinition {
  switch (category) {
    case 'Food':
      return faUtensils;
    case 'Transport':
      return faCar;
    case 'Shopping':
      return faBagShopping;
    case 'Salary':
      return faMoneyBillTrendUp;
    case 'Entertainment':
      return faGamepad;
    case 'Health':
      return faNotesMedical;
    case 'Taxes':
      return faMoneyBillTransfer;
    case 'Other':
      return faWallet;
    default:
      console.warn(`Unrecognized category: "${category}". Falling back to wallet icon.`);
      return faWallet;
  }
}

export default getCategoryIcon;
