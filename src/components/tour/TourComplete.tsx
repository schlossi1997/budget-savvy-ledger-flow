
import React from 'react';
import { CheckCircle } from 'lucide-react';

const TourComplete: React.FC = () => {
  return (
    <div className="space-y-3 text-center">
      <div className="flex justify-center">
        <CheckCircle className="h-12 w-12 text-primary" />
      </div>
      <p className="text-sm">
        Congratulations! You've completed the Budget Savvy tour.
      </p>
      <p className="text-sm">
        You're now ready to take control of your finances. Start by adding your transactions and setting up your first budget.
      </p>
      <div className="bg-primary/10 p-3 rounded-md text-sm mt-2">
        <p>
          Remember, your financial journey is unique. Budget Savvy is here to help you every step of the way.
        </p>
      </div>
    </div>
  );
};

export default TourComplete;
