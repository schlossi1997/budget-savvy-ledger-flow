
import React from 'react';

const TourBudgets: React.FC = () => {
  return (
    <div className="space-y-3">
      <p className="text-sm">
        The <strong>Budgets</strong> page allows you to:
      </p>
      <ul className="text-sm space-y-2 list-disc pl-5">
        <li>
          Create budgets for different expense categories
        </li>
        <li>
          Set monthly spending limits
        </li>
        <li>
          Track your progress against budget goals
        </li>
        <li>
          Adjust budgets as your financial situation changes
        </li>
      </ul>
      <div className="bg-primary/10 p-3 rounded-md text-sm mt-2">
        <p>
          <strong>Pro tip:</strong> Start with realistic budgets based on your past spending patterns.
        </p>
      </div>
    </div>
  );
};

export default TourBudgets;
