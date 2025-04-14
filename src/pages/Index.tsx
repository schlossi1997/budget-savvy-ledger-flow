
import MainLayout from '@/components/layout/MainLayout';
import FinancialSummary from '@/components/dashboard/FinancialSummary';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import ExpenseBreakdown from '@/components/dashboard/ExpenseBreakdown';
import BudgetOverview from '@/components/dashboard/BudgetOverview';

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your finances</p>
        </div>
        
        <FinancialSummary />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RecentTransactions />
          <ExpenseBreakdown />
        </div>
        
        <BudgetOverview />
      </div>
    </MainLayout>
  );
};

export default Index;
