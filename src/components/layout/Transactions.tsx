import { motion, AnimatePresence } from 'framer-motion';
import TransactionItem from '../ui/TransactionItem';

import { useSelector, useDispatch } from 'react-redux';
import { Transaction } from '../../utils/types';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import { setSortType, setCategory, setSortBy } from '../../redux/slices/filterSlice';

const MotionTransactionItem = motion.create(TransactionItem);

interface TransactionProps {
  notifyRemoveTransaction(): string;
}

function Transactions({ notifyRemoveTransaction }: TransactionProps) {
  const [type, setType] = useState('all');
  const [category, setSortCategory] = useState('all');
  const [orderBy, setOrderByLocal] = useState('date_desc');
  const items = useSelector((state: RootState) => state.transactions.transactions);
  const filter = useSelector((state: RootState) => state.filter);

  const selectAvailableCategories = (state: RootState): string[] => {
    return state.transactions.transactions.reduce((acc: string[], transaction: Transaction) => {
      if (!acc.includes(transaction.category)) {
        acc.push(transaction.category);
      }
      return acc;
    }, []);
  };
  const availableCategories = selectAvailableCategories(useSelector((state: RootState) => state));
  const dispatch = useDispatch();

  // TODO: fix filters
  const filteredItems = items
    .filter((transaction: Transaction) => {
      if (filter.type !== 'all' && transaction.type !== filter.type) {
        return false;
      }
      if (filter.category !== 'all' && transaction.category !== filter.category) {
        return false;
      }
      return true;
    })
    .sort((a: Transaction, b: Transaction) => {
      if (filter.sortBy === 'date_desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (filter.sortBy === 'date_asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (filter.sortBy === 'amount_desc') {
        return b.amount - a.amount;
      }
      if (filter.sortBy === 'amount_asc') {
        return a.amount - b.amount;
      }
      return 0;
    });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortType(e.target.value));
    setType(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(e.target.value));
    setSortCategory(e.target.value);
  };

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value));
    setOrderByLocal(e.target.value);
  };

  return (
    <div className="lg:col-span-3 glass-card p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold text-gray-300">История операций</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            id="filterType"
            value={type}
            onChange={handleTypeChange}
            className="w-full sm:w-auto bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm">
            <option value="all">Все типы</option>
            <option value="income">Доходы</option>
            <option value="expense">Расходы</option>
          </select>
          <select
            id="filterCategory"
            value={category}
            onChange={handleCategoryChange}
            className="w-full sm:w-auto bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm">
            <option value="all">Все категории</option>
            {availableCategories.map((category: string, index: number) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            id="sortBy"
            value={orderBy}
            onChange={handleOrderByChange}
            className="w-full sm:w-auto bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm">
            <option value="date_desc">Сначала новые</option>
            <option value="date_asc">Сначала старые</option>
            <option value="amount_desc">Сумма (по убыв.)</option>
            <option value="amount_asc">Сумма (по возр.)</option>
          </select>
        </div>
      </div>

      <ul className="space-y-3">
        <AnimatePresence>
          {filteredItems.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Нет транзакций</p>
          ) : (
            filteredItems.map((item: Transaction) => (
              <MotionTransactionItem
                key={item.id}
                title={item.title}
                date={item.date}
                amount={item.amount}
                category={item.category}
                notifyRemoveTransaction={notifyRemoveTransaction}
                id={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              />
            ))
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default Transactions;
