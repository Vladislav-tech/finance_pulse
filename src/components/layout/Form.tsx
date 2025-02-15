import { useState } from 'react';
import { Transaction, TransactionType } from '../../utils/types';

import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../redux/transactionsSlice';
import { stringToTransactionCategory } from '../../utils/helpers/stringToTransactionCategory';
import { RootState } from '../../redux/store';

function Form() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');
  const [category, setCategory] = useState('Other');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();
  const lastId: number | undefined = useSelector(
    (state: RootState) => state.transactions.transactions?.at(-1)?.id,
  );

  const clearForm = () => {
    setTitle('');
    setAmount(0);
    setType('');
    setCategory('');
    setDate('');
  };

  // const isValidForm = (): boolean => {
  //   if (
  //     title.trim() === '' ||
  //     amount === 0 ||
  //     type.trim() === '' ||
  //     category.trim() === '' ||
  //     date.trim() === ''
  //   ) {
  //     return false;
  //   }

  //   return true;
  // };

  const addData = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // console.log(isValidForm());

    // if (!isValidForm()) {
    //   return;
    // }

    const newTransaction: Transaction = {
      title,
      amount: type === 'expense' ? -amount : amount,
      category: stringToTransactionCategory(category),
      type: type === 'income' ? TransactionType.INCOME : TransactionType.EXPENSE,
      date: new Date(date),
      id: (lastId || 0) + 1,
    };

    clearForm();

    dispatch(addTransaction(newTransaction));
  };

  return (
    <div className="glass-card p-6">
      <form id="transactionForm" className="space-y-4">
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
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Сумма"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              id="type"
              className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required>
              <option value="income">Доход</option>
              <option value="expense">Расход</option>
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              required
              className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="Other">Другое</option>
              <option value="Food">Еда</option>
              <option value="Transport">Транспорт</option>
              <option value="Shopping">Шопинг</option>
              <option value="Salary">Зарплата</option>
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
          onClick={(event) => addData(event)}
          type="submit"
          className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all hover:scale-[1.02]">
          <i className="fas fa-plus-circle mr-2" />
          Добавить
        </button>
      </form>
    </div>
  );
}

export default Form;
