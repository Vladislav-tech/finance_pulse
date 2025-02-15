import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import formatCurrency from '../../utils/helpers/formatCurrency';
import { TransactionCategory } from '../../utils/types';
import getCategoryIcon from '../../utils/helpers/getCategoryIcon';
import { useDispatch } from 'react-redux';
import { removeTransaction } from '../../redux/transactionsSlice';

interface TransactionItemProps {
  title: string;
  date: Date;
  category: TransactionCategory;
  amount: number;
  id: number;
}

function TransactionItem({ title, date, amount, category, id }: TransactionItemProps) {

  const dispatch = useDispatch();

  const color = amount > 0 ? 'green' : 'red';
  return (
    <li className="transaction-item p-4 rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="category-icon text-blue-400">
        <FontAwesomeIcon icon={getCategoryIcon(category)} />
        </div>
        <div>
          <div className="font-medium text-gray-200">{title}</div>
          <div className="text-sm text-gray-400 flex items-center space-x-3">
            <span>
              {date.toLocaleString('ru', {
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                year: 'numeric',
              })}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full bg-${color}-900/50 text-${color}-400`}>
              {category}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`text-${color}-400 font-medium`}>{formatCurrency(amount)} ₽</span>
        <button className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer" onClick={() => dispatch(removeTransaction(id))}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </li>
  );
}

export default TransactionItem;
