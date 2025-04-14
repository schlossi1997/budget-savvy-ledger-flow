
import React from 'react';
import { calculateBudgetStatus, formatCurrency, mockBudgets } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import AddBudgetDialog from './AddBudgetDialog';

const BudgetList = () => {
  const budgets = [...mockBudgets];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Budgets</h2>
          <p className="text-muted-foreground">Manage your category budgets</p>
        </div>
        <AddBudgetDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
        {budgets.map((budget) => {
          const status = calculateBudgetStatus(budget);
          const percentage = Math.min(Math.round((budget.spent / budget.amount) * 100), 100);
          
          return (
            <Card key={budget.id} className="card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{budget.category}</CardTitle>
                    <CardDescription>
                      {formatCurrency(budget.spent)} of {formatCurrency(budget.amount)}
                    </CardDescription>
                  </div>
                  <div className={`text-sm font-medium px-2 py-1 rounded ${
                    status === 'safe' ? 'bg-green-100 text-green-800' :
                    status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                    status === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {percentage}%
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={percentage} 
                  className={`h-2 ${
                    status === 'safe' ? 'bg-muted' :
                    status === 'low' ? 'bg-yellow-100' :
                    status === 'medium' ? 'bg-orange-100' :
                    'bg-red-100'
                  }`}
                  indicatorClassName={`${
                    status === 'safe' ? 'bg-green-500' :
                    status === 'low' ? 'bg-yellow-500' :
                    status === 'medium' ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                />
                <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                  <div>Remaining: {formatCurrency(budget.amount - budget.spent)}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetList;
