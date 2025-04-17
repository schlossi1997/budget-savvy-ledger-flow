
import React from 'react';

const TourWelcome: React.FC = () => {
  return (
    <div className="space-y-3">
      <p className="text-sm">
        Welcome to <strong>Budget Savvy</strong>! This tour will guide you through the key features of your new budget management system.
      </p>
      <p className="text-sm">
        Now that you've completed the setup, let's explore how to use Budget Savvy to manage your finances effectively.
      </p>
      <div className="bg-primary/10 p-3 rounded-md text-sm">
        <p>
          This tour will only appear once. You can exit at any time by clicking the X in the top corner.
        </p>
      </div>
    </div>
  );
};

export default TourWelcome;
