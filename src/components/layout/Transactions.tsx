import TransactionItem from '../ui/TransactionItem';

import { useSelector } from 'react-redux';
import { Transaction } from '../../utils/types';

function Transactions() {
  const items = useSelector((state: any) => state.transactions.transactions);
  return (
    <div className="lg:col-span-3 glass-card p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold text-gray-300">История операций</h2>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <select
            id="filterType"
            className="bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm">
            <option value="all">Все типы</option>
            <option value="income">Доходы</option>
            <option value="expense">Расходы</option>
          </select>
          <select
            id="filterCategory"
            className="bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm">
            <option value="all">Все категории</option>
          </select>
          <select
            id="sortBy"
            className="bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm">
            <option value="date_desc">Сначала новые</option>
            <option value="date_asc">Сначала старые</option>
            <option value="amount_desc">Сумма (по убыв.)</option>
            <option value="amount_asc">Сумма (по возр.)</option>
          </select>
        </div>
      </div>
      {/* <ul id="transactions" className="space-y-3" /> */}
      <ul className="space-y-3">
        {items.map((item: Transaction) => (
          <TransactionItem
            key={item.id}
            title={item.title}
            date={item.date}
            amount={item.amount}
            category={item.category}
            id={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
