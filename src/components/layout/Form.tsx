import { useState, useRef } from 'react';
import {
  AVAILABLE_CATEGORIES,
  Transaction,
  TransactionCategory,
  TransactionType,
} from '../../utils/types';

import { useDispatch, useSelector } from 'react-redux';

import { addTransaction } from '../../redux/slices/transactionsSlice';
import { RootState } from '../../redux/store';
import isPositiveNumber from '../../utils/helpers/isPositiveNumber';

const CATEGORY_OPTIONS = Object.entries(AVAILABLE_CATEGORIES).map(
  ([key, value]: [string, string], index: number) => (
    <option key={`${key}-${index}`} value={key}>
      {value}
    </option>
  ),
);

const FORMATTED_DATE_NOW = new Date().toISOString().split('T')[0];

interface FormProps {
  notify(message: string): string;
}

function Form({ notify }: FormProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<Transaction['type']>('income');
  const [category, setCategory] = useState<Transaction['category']>('Other');
  const [date, setDate] = useState(FORMATTED_DATE_NOW);

  const amountInputRef = useRef(null);

  const dispatch = useDispatch();
  const lastId: number | undefined = useSelector(
    (state: RootState) => state.transactions.transactions?.at(-1)?.id,
  );

  const clearForm = () => {
    setTitle('');
    setAmount('');
    setType('income');
    setCategory('Other');
    setDate(FORMATTED_DATE_NOW);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isPositiveNumber(event.target.value) || event.target.value === '') {
      setAmount(event.target.value);
    }
  };

  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCategory(event.target.value as TransactionCategory);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    notify('Транзакция добавлена!');
    const newTransaction: Transaction = {
      title,
      amount: type === 'expense' ? -amount : +amount,
      category: category as TransactionCategory,
      type: type as TransactionType,
      date: new Date(date).toLocaleDateString(),
      id: (lastId || 0) + 1,
    };

    clearForm();

    dispatch(addTransaction(newTransaction));
  };

  return (
    <div className="glass-card p-6">
      <form id="transactionForm" className="space-y-4" onSubmit={(event) => handleSubmit(event)}>
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Название транзакции"
            required
          />
          <input
            type="text"
            ref={amountInputRef}
            value={amount}
            onChange={(e) => handleAmountChange(e)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Сумма"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              id="type"
              className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={type}
              onChange={(e) => setType(e.target.value as TransactionType)}
              required>
              <option value="income">Доход</option>
              <option value="expense">Расход</option>
            </select>
            <select
              value={category}
              onChange={(e) => handleChangeCategory(e)}
              id="category"
              required
              className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              {CATEGORY_OPTIONS}
            </select>
          </div>
          <div className="flatpickr-container">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="date"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Выберите дату"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all hover:scale-[1.02]">
          Добавить
        </button>
      </form>
    </div>
  );
}

export default Form;
