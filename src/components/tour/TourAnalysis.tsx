
import React from 'react';

const TourAnalysis: React.FC = () => {
  return (
    <div className="space-y-3">
      <p className="text-sm">
        The <strong>Analysis</strong> page provides insights into your finances:
      </p>
      <ul className="text-sm space-y-2 list-disc pl-5">
        <li>
          View spending trends over time
        </li>
        <li>
          Compare income vs. expenses
        </li>
        <li>
          Analyze spending by category
        </li>
        <li>
          Track your savings rate
        </li>
      </ul>
      <p className="text-sm mt-2">
        These visualizations help you make informed decisions about your money and identify opportunities to save.
      </p>
    </div>
  );
};

export default TourAnalysis;
