import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import formatCurrency from '../../utils/helpers/formatCurrency';
import getCategoryIcon from '../../utils/helpers/getCategoryIcon';
import { useDispatch } from 'react-redux';
import { removeTransaction } from '../../redux/slices/transactionsSlice';

interface TransactionItemProps {
  title: string;
  date: string;
  category: string;
  amount: number;
  id: number;
}

const TransactionItem = forwardRef<HTMLLIElement, TransactionItemProps>(
  ({ title, date, amount, category, id }, ref) => {
    const dispatch = useDispatch();
    const color = amount > 0 ? 'green' : 'red';

    return (
      <li ref={ref} className="transaction-item p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-row items-center space-x-4">
          <div className="category-icon text-blue-400">
            <FontAwesomeIcon icon={getCategoryIcon(category)} size="lg" />
          </div>
          <div className="flex-1 flex flex-row items-center space-x-3 overflow-x-auto">
            <span className="font-medium text-gray-200 truncate whitespace-nowrap">{title}</span>
            <span className="text-sm text-gray-400 truncate whitespace-nowrap">
              {date}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full bg-${color}-900/50 text-${color}-400 truncate whitespace-nowrap`}>
              {category}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between space-x-4 w-full sm:w-auto">
          <span className={`text-${color}-400 font-medium`}>{formatCurrency(amount)} ₽</span>
          <button
            className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
            onClick={() => dispatch(removeTransaction(id))}
            title="Удалить"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </li>
    );
  }
);

export default TransactionItem;
