import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Transaction, TransactionCategory, TransactionType } from '../../utils/types';
import { updateTransaction } from '../../redux/slices/transactionsSlice';
import { AVAILABLE_CATEGORIES } from '../../utils/types';

const CATEGORY_OPTIONS = Object.entries(AVAILABLE_CATEGORIES).map(
  ([key, value], index) => (
    <option key={`${key}-${index}`} value={key}>
      {value}
    </option>
  )
);

interface TransactionEditFormProps {
  transaction: Transaction;
  onClose: () => void;
  notify: (message: string) => string;
}

const TransactionEditForm: React.FC<TransactionEditFormProps> = ({ transaction, onClose, notify }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(String(Math.abs(transaction.amount)));
  const [type, setType] = useState<TransactionType>(transaction.type);
  const [category, setCategory] = useState<TransactionCategory>(transaction.category);
  const [date, setDate] = useState(new Date(transaction.date).toLocaleDateString());

  useEffect(() => {
    setTitle(transaction.title);
    setAmount(String(Math.abs(transaction.amount)));
    setType(transaction.type);
    setCategory(transaction.category);
    setDate(new Date(transaction.date).toLocaleDateString());
  }, [transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTransaction: Transaction = {
      ...transaction,
      title,
      amount: type === 'expense' ? -Number(amount) : Number(amount),
      category,
      type,
      date: new Date(date).toLocaleDateString()
    };
    dispatch(updateTransaction(updatedTransaction));
    onClose();
    notify('Транзакция обновлена!')
  };

  console.log(date);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название транзакции"
        required
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Сумма"
        required
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="grid grid-cols-2 gap-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          required
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TransactionCategory)}
          required
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Выберите категорию</option>
          {CATEGORY_OPTIONS}
        </select>
      </div>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Отмена
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Сохранить
        </button>
      </div>
    </form>
  );
};

export default TransactionEditForm;