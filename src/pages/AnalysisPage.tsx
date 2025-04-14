
import MainLayout from '@/components/layout/MainLayout';
import IncomeVsExpenses from '@/components/analysis/IncomeVsExpenses';
import CategoryAnalysis from '@/components/analysis/CategoryAnalysis';
import SavingsRate from '@/components/analysis/SavingsRate';

const AnalysisPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financial Analysis</h2>
          <p className="text-muted-foreground">Insights into your financial data</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <IncomeVsExpenses />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CategoryAnalysis />
          <SavingsRate />
        </div>
      </div>
    </MainLayout>
  );
};

export default AnalysisPage;
