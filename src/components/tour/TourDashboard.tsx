
import React from 'react';
import { ArrowDown } from 'lucide-react';

const TourDashboard: React.FC = () => {
  return (
    <div className="space-y-3">
      <p className="text-sm">
        The <strong>Dashboard</strong> provides a quick overview of your financial status:
      </p>
      <ul className="text-sm space-y-2 list-disc pl-5">
        <li>
          View your current <strong>balance</strong>, <strong>income</strong>, and <strong>expenses</strong>
        </li>
        <li>
          Check recent transactions at a glance
        </li>
        <li>
          See expense categories breakdown
        </li>
        <li>
          Monitor your budget status
        </li>
      </ul>
      <div className="flex justify-center mt-2">
        <ArrowDown className="h-6 w-6 text-primary animate-bounce" />
      </div>
    </div>
  );
};

export default TourDashboard;
