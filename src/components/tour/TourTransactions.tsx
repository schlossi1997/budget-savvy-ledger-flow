
import React from 'react';

const TourTransactions: React.FC = () => {
  return (
    <div className="space-y-3">
      <p className="text-sm">
        The <strong>Transactions</strong> page helps you:
      </p>
      <ul className="text-sm space-y-2 list-disc pl-5">
        <li>
          Record all income and expenses
        </li>
        <li>
          Categorize transactions for better analysis
        </li>
        <li>
          Filter and search through your financial history
        </li>
        <li>
          Track recurring payments
        </li>
      </ul>
      <p className="text-sm mt-2">
        Use the <strong>+ Add Transaction</strong> button to record new income or expenses.
      </p>
    </div>
  );
};

export default TourTransactions;
