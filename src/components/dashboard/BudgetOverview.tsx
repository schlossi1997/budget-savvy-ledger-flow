
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateBudgetStatus, formatCurrency, mockBudgets } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BudgetOverview = () => {
  const topBudgets = mockBudgets
    .sort((a, b) => (b.spent / b.amount) - (a.spent / a.amount))
    .slice(0, 4);

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Budget Overview</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/budgets">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topBudgets.map((budget) => {
            const status = calculateBudgetStatus(budget);
            const percentage = Math.min(Math.round((budget.spent / budget.amount) * 100), 100);
            
            return (
              <div key={budget.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{budget.category}</span>
                  <span className="text-sm">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                  </span>
                </div>
                <div className="budget-progress-bar">
                  <div 
                    className={`budget-progress budget-${status}`} 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-end">
                  <span className="text-xs text-muted-foreground">{percentage}%</span>
                </div>
              </div>
            );
          })}
          {topBudgets.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No budgets available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
