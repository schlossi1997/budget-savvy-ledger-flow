
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { expenseCategories } from '@/lib/mockData';
import { useToast } from '@/components/ui/use-toast';

interface Budget {
  id: number;
  category: string;
  amount: number;
  spent: number;
}

interface EditBudgetDialogProps {
  budget: Budget;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (budget: Budget) => void;
}

const EditBudgetDialog = ({ budget, open, onOpenChange, onUpdate }: EditBudgetDialogProps) => {
  const { toast } = useToast();
  const [category, setCategory] = useState(budget?.category || '');
  const [amount, setAmount] = useState(budget?.amount?.toString() || '');
  const [spent, setSpent] = useState(budget?.spent?.toString() || '');

  useEffect(() => {
    if (budget) {
      setCategory(budget.category);
      setAmount(budget.amount.toString());
      setSpent(budget.spent.toString());
    }
  }, [budget]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!category || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const updatedBudget = {
      ...budget,
      category,
      amount: parseFloat(amount),
      spent: parseFloat(spent)
    };

    onUpdate(updatedBudget);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="edit-category" className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-amount" className="text-right">
                Amount
              </Label>
              <Input
                id="edit-amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
                placeholder="0.00"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-spent" className="text-right">
                Spent
              </Label>
              <Input
                id="edit-spent"
                type="number"
                step="0.01"
                value={spent}
                onChange={(e) => setSpent(e.target.value)}
                className="col-span-3"
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBudgetDialog;
