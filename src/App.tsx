import Info from './components/layout/Info';
import Form from './components/layout/Form';
import Transactions from './components/layout/Transactions';
import Header from './components/ui/Header';
import toast, { Toaster } from 'react-hot-toast';

const notifyAddTransaction = () => toast.success('Транзакция добавлена!');
const notifyRemoveTransaction = () => toast.success('Транзакция удалена');

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Info />
        <Form notifyAddTransaction={notifyAddTransaction} />
        <Toaster
          position="bottom-right"
          toastOptions={{ style: { background: '#141D2D', color: '#fff' }, removeDelay: 850 }}
        />
        <Transactions notifyRemoveTransaction={notifyRemoveTransaction}/>
      </main>
    </div>
  );
}

export default App;
