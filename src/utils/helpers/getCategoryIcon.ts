import { faUtensils, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

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
      throw new Error('Unknown category');
  }
}

export default getCategoryIcon;
