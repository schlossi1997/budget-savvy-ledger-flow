
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateTotalExpenses, calculateTotalIncome, formatCurrency } from '@/lib/mockData';
import { Progress } from '@/components/ui/progress';

const SavingsRate = () => {
  const totalIncome = calculateTotalIncome();
  const totalExpenses = calculateTotalExpenses();
  const savings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;
  
  let rateStatus = 'text-red-500';
  if (savingsRate >= 20) {
    rateStatus = 'text-green-500';
  } else if (savingsRate >= 10) {
    rateStatus = 'text-yellow-500';
  } else if (savingsRate >= 0) {
    rateStatus = 'text-orange-500';
  }

  return (
    <Card className="col-span-1 animate-fade-in">
      <CardHeader>
        <CardTitle>Savings Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <span className={`text-4xl font-bold ${rateStatus}`}>{savingsRate}%</span>
            <p className="text-sm text-muted-foreground mt-1">of income saved</p>
          </div>
          
          <Progress value={savingsRate} className="h-2" />
          
          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Income:</span>
              <span className="font-medium">{formatCurrency(totalIncome)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Expenses:</span>
              <span className="font-medium">{formatCurrency(totalExpenses)}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t">
              <span>Total Savings:</span>
              <span className={`font-medium ${savings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(savings)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsRate;
