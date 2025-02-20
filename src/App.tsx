import Info from './components/layout/Info';
import Form from './components/layout/Form';
import Transactions from './components/layout/Transactions';
import Header from './components/ui/Header';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Modal from './components/ui/Modal';
import { Transaction } from './utils/types';
import TransactionEditForm from './components/ui/TransactionEditForm'; // новый файл ниже

const notify = (message: string) => toast.success(message);

function App() {
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  const handleEditTransaction = (transaction: Transaction) => {
    setEditTransaction(transaction);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Info />
        <Form notify={notify} />
        <Toaster
          position="bottom-right"
          toastOptions={{ style: { background: '#141D2D', color: '#fff' }, removeDelay: 850 }}
        />
        <Transactions
          notify={notify}
          
          onEditTransaction={handleEditTransaction}
        />
        {editTransaction && (
          <Modal
            isOpen={!!editTransaction}
            onClose={() => setEditTransaction(null)}
            title="Редактировать транзакцию"
          >
            <TransactionEditForm
              notify={notify}
              transaction={editTransaction}
              onClose={() => setEditTransaction(null)}
            />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
