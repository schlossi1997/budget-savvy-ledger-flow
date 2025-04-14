
import React, { useState } from 'react';
import { formatCurrency, mockTransactions } from '@/lib/mockData';
import { format } from 'date-fns';
import { ArrowDownRight, ArrowUpRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AddTransactionDialog from './AddTransactionDialog';

const TransactionList = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredTransactions = mockTransactions
    .filter(transaction => {
      // Filter by search
      if (search) {
        const searchLower = search.toLowerCase();
        return (
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter(transaction => {
      // Filter by type
      if (filter === 'income') {
        return transaction.type === 'income';
      } else if (filter === 'expense') {
        return transaction.type === 'expense';
      }
      return true;
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expenses</SelectItem>
            </SelectContent>
          </Select>
          <AddTransactionDialog />
        </div>
      </div>

      <div className="bg-white rounded-md border animate-fade-in">
        <div className="grid grid-cols-12 px-4 py-3 border-b text-sm font-medium text-muted-foreground">
          <div className="col-span-5 sm:col-span-4">Description</div>
          <div className="col-span-3 hidden sm:block">Category</div>
          <div className="col-span-3 sm:col-span-2">Date</div>
          <div className="col-span-4 sm:col-span-3 text-right">Amount</div>
        </div>
        <div className="divide-y max-h-[600px] overflow-y-auto scrollbar-hide">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="grid grid-cols-12 px-4 py-3 hover:bg-muted/50 transition-colors">
                <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                  <div className={`p-1.5 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="h-3 w-3 text-income" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-expense" />
                    )}
                  </div>
                  <span className="text-sm font-medium truncate">{transaction.description}</span>
                </div>
                <div className="col-span-3 hidden sm:flex items-center text-sm">
                  {transaction.category}
                </div>
                <div className="col-span-3 sm:col-span-2 flex items-center text-sm">
                  {format(new Date(transaction.date), 'MMM d, yyyy')}
                </div>
                <div className={`col-span-4 sm:col-span-3 flex items-center justify-end text-sm font-medium ${
                  transaction.amount > 0 ? 'money-positive' : 'money-negative'
                }`}>
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-muted-foreground">
              No transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
