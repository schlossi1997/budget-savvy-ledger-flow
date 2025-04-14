
import React, { useState } from 'react';
import { calculateBudgetStatus, formatCurrency, mockBudgets } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AddBudgetDialog from './AddBudgetDialog';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import EditBudgetDialog from './EditBudgetDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const BudgetList = () => {
  const { toast } = useToast();
  const [budgets, setBudgets] = useState([...mockBudgets]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = (id) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
    toast({
      title: "Budget deleted",
      description: "The budget has been successfully deleted",
    });
  };

  const handleEdit = (budget) => {
    setSelectedBudget(budget);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (updatedBudget) => {
    setBudgets(budgets.map(budget => 
      budget.id === updatedBudget.id ? updatedBudget : budget
    ));
    setIsEditDialogOpen(false);
    toast({
      title: "Budget updated",
      description: "The budget has been successfully updated",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Budgets</h2>
          <p className="text-muted-foreground">Manage your category budgets</p>
        </div>
        <AddBudgetDialog onAddBudget={(newBudget) => setBudgets([...budgets, { ...newBudget, id: Date.now() }])} />
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
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(budget)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the {budget.category} budget.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(budget.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {selectedBudget && (
        <EditBudgetDialog 
          budget={selectedBudget} 
          open={isEditDialogOpen} 
          onOpenChange={setIsEditDialogOpen}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default BudgetList;
