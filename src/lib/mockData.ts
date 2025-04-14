
import { format, subDays } from 'date-fns';

// Generate dates for the last 30 days
export const generateDates = (count: number) => {
  return Array.from({ length: count }).map((_, i) => {
    const date = subDays(new Date(), i);
    return format(date, 'yyyy-MM-dd');
  }).reverse();
};

// Categories with icons
export const expenseCategories = [
  { id: 1, name: 'Housing', icon: 'Home' },
  { id: 2, name: 'Food', icon: 'Utensils' },
  { id: 3, name: 'Transportation', icon: 'Car' },
  { id: 4, name: 'Entertainment', icon: 'Film' },
  { id: 5, name: 'Shopping', icon: 'ShoppingBag' },
  { id: 6, name: 'Healthcare', icon: 'Stethoscope' },
  { id: 7, name: 'Education', icon: 'GraduationCap' },
  { id: 8, name: 'Utilities', icon: 'Zap' },
  { id: 9, name: 'Travel', icon: 'Plane' },
  { id: 10, name: 'Other', icon: 'MoreHorizontal' },
];

export const incomeCategories = [
  { id: 1, name: 'Salary', icon: 'Briefcase' },
  { id: 2, name: 'Freelance', icon: 'Laptop' },
  { id: 3, name: 'Investment', icon: 'TrendingUp' },
  { id: 4, name: 'Gift', icon: 'Gift' },
  { id: 5, name: 'Other', icon: 'MoreHorizontal' },
];

// Mock transactions data
export const mockTransactions = [
  { id: 1, date: '2025-04-10', amount: 2000, type: 'income', category: 'Salary', description: 'Monthly salary' },
  { id: 2, date: '2025-04-08', amount: -120, type: 'expense', category: 'Food', description: 'Grocery shopping' },
  { id: 3, date: '2025-04-07', amount: -50, type: 'expense', category: 'Transportation', description: 'Gas' },
  { id: 4, date: '2025-04-05', amount: -15, type: 'expense', category: 'Entertainment', description: 'Movie ticket' },
  { id: 5, date: '2025-04-04', amount: -80, type: 'expense', category: 'Shopping', description: 'New shirt' },
  { id: 6, date: '2025-04-03', amount: 500, type: 'income', category: 'Freelance', description: 'Website project' },
  { id: 7, date: '2025-04-02', amount: -35, type: 'expense', category: 'Healthcare', description: 'Pharmacy' },
  { id: 8, date: '2025-04-01', amount: -200, type: 'expense', category: 'Housing', description: 'Electricity bill' },
  { id: 9, date: '2025-03-30', amount: -60, type: 'expense', category: 'Food', description: 'Restaurant' },
  { id: 10, date: '2025-03-28', amount: 100, type: 'income', category: 'Gift', description: 'Birthday gift' },
];

// Mock budget data
export const mockBudgets = [
  { id: 1, category: 'Housing', amount: 1000, spent: 800 },
  { id: 2, category: 'Food', amount: 500, spent: 380 },
  { id: 3, category: 'Transportation', amount: 300, spent: 150 },
  { id: 4, category: 'Entertainment', amount: 200, spent: 190 },
  { id: 5, category: 'Shopping', amount: 300, spent: 320 },
  { id: 6, category: 'Healthcare', amount: 200, spent: 35 },
  { id: 7, category: 'Education', amount: 150, spent: 0 },
  { id: 8, category: 'Utilities', amount: 250, spent: 200 },
];

// Mock monthly summary data
export const mockMonthlySummary = [
  { month: 'Jan', income: 2500, expenses: 2100 },
  { month: 'Feb', income: 2800, expenses: 2300 },
  { month: 'Mar', income: 2600, expenses: 2400 },
  { month: 'Apr', income: 3000, expenses: 2200 },
  { month: 'May', income: 2700, expenses: 2500 },
  { month: 'Jun', income: 3100, expenses: 2600 },
];

// Helper functions
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateBudgetStatus = (budget: { amount: number; spent: number }) => {
  const ratio = budget.spent / budget.amount;
  if (ratio < 0.7) return 'safe';
  if (ratio < 0.9) return 'low';
  if (ratio < 1) return 'medium';
  return 'high';
};

export const calculateTotalIncome = () => {
  return mockTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateTotalExpenses = () => {
  return Math.abs(
    mockTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  );
};

export const calculateBalance = () => {
  return mockTransactions.reduce((sum, t) => sum + t.amount, 0);
};

export const getCategoryIcon = (category: string, type: string = 'expense') => {
  const categories = type === 'income' ? incomeCategories : expenseCategories;
  return categories.find(c => c.name === category)?.icon || 'Circle';
};

export const getCategoryExpenses = () => {
  const categoryMap = new Map<string, number>();
  
  mockTransactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const current = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, current + Math.abs(t.amount));
    });
  
  return Array.from(categoryMap.entries()).map(([name, amount]) => ({
    name,
    amount
  })).sort((a, b) => b.amount - a.amount);
};
