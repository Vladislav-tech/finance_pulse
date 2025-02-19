import Info from './components/layout/Info';
import Form from './components/layout/Form';
import Transactions from './components/layout/Transactions';
import Header from './components/ui/Header';

function App() {

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Info />
        <Form />
        <Transactions />
      </main>
    </div>
  );
}

export default App;
