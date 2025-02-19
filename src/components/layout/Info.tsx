import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import formatCurrency from '../../utils/helpers/formatCurrency';
import { Transaction, TransactionCategory } from '../../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getCategoryIcon from '../../utils/helpers/getCategoryIcon';
import CountUp from 'react-countup';
import { useEffect, useRef } from 'react';

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function Info() {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const amount = useSelector((state: RootState) => state.transactions.amount);

  const income = transactions
    .filter((t: Transaction) => t.amount > 0)
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

  const expense = transactions
    .filter((t: Transaction) => t.amount < 0)
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

  const transactionCount = transactions.length;

  // Запоминаем предыдущие значения
  const prevAmount = usePrevious(amount) ?? amount;
  const prevIncome = usePrevious(income) ?? income;
  const prevExpense = usePrevious(expense) ?? expense;
  const prevTransactionCount = usePrevious(transactionCount) ?? transactionCount;

  // Вычисляем самую частую категорию
  let frequentCategory: TransactionCategory | null = null;
  let highestFrequency = 0;
  const categoryCount: { [key: string]: number } = {};

  transactions.forEach((t: Transaction) => {
    categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
    if (categoryCount[t.category] > highestFrequency) {
      highestFrequency = categoryCount[t.category];
      frequentCategory = t.category;
    }
  });
  // Если ни одна категория не встречается больше одного раза, берём последний платеж
  if (highestFrequency === 1 && transactions.length > 0) {
    frequentCategory = transactions[transactions.length - 1].category;
  }

  return (
    <div className="glass-card p-6 hover:scale-[1.02] transition-transform">
      <h2 className="text-xl font-semibold mb-4 text-gray-300">Текущий баланс</h2>
      <p
        id="balance"
        className={`text-4xl font-bold bg-clip-text ${
          amount < 0
            ? 'text-red-400'
            : 'text-transparent bg-gradient-to-r from-green-400 to-cyan-500'
        }`}>
        <CountUp
          start={prevAmount}
          end={amount}
          duration={1.5}
          formattingFn={(value) => formatCurrency(value)}
          suffix=" ₽"
        />
      </p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-800 rounded-lg shadow">
          <h3 className="text-gray-400 text-sm">Доходы</h3>
          <p className="text-xl font-semibold text-green-400">
            <CountUp
              start={prevIncome}
              end={income}
              duration={1.5}
              formattingFn={(value) => formatCurrency(value)}
              suffix=" ₽"
            />
          </p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow">
          <h3 className="text-gray-400 text-sm">Расходы</h3>
          <p className="text-xl font-semibold text-red-400">
            <CountUp
              start={Math.abs(prevExpense)}
              end={Math.abs(expense)}
              duration={1.5}
              formattingFn={(value) => formatCurrency(value)}
              suffix=" ₽"
            />
          </p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow">
          <h3 className="text-gray-400 text-sm">Операций</h3>
          <p className="text-xl font-semibold text-gray-300">
            <CountUp start={prevTransactionCount} end={transactionCount} duration={1.5} />
          </p>
        </div>
        {frequentCategory && (
          <div className="p-4 bg-gray-800 rounded-lg shadow flex flex-col items-center">
            <h3 className="text-gray-400 text-sm mb-2">Популярная категория</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xl text-cyan-400">
                <FontAwesomeIcon icon={getCategoryIcon(frequentCategory)} />
              </span>
              <span className="text-xl font-semibold text-gray-300">{frequentCategory}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Info;
