
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, mockTransactions } from '@/lib/mockData';
import { format } from 'date-fns';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RecentTransactions = () => {
  const recentTransactions = mockTransactions.slice(0, 5);

  return (
    <Card className="col-span-1 md:col-span-2 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/transactions">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="h-4 w-4 text-income" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-expense" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction.category} • {format(new Date(transaction.date), 'MMM d')}</p>
                </div>
              </div>
              <div className={transaction.amount > 0 ? 'money-positive' : 'money-negative'}>
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
          {recentTransactions.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No recent transactions
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
