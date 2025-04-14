
import MainLayout from '@/components/layout/MainLayout';
import TransactionList from '@/components/transactions/TransactionList';

const TransactionsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">Manage your income and expenses</p>
        </div>
        
        <TransactionList />
      </div>
    </MainLayout>
  );
};

export default TransactionsPage;
