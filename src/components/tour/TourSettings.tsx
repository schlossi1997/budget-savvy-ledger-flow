
import React from 'react';

const TourSettings: React.FC = () => {
  return (
    <div className="space-y-3">
      <p className="text-sm">
        The <strong>Settings</strong> page lets you customize Budget Savvy:
      </p>
      <ul className="text-sm space-y-2 list-disc pl-5">
        <li>
          Update your personal information
        </li>
        <li>
          Manage account preferences
        </li>
        <li>
          Configure notification settings
        </li>
        <li>
          Customize the appearance of your dashboard
        </li>
      </ul>
      <div className="bg-primary/10 p-3 rounded-md text-sm mt-2">
        <p>
          You can access system-wide settings here if you're an administrator.
        </p>
      </div>
    </div>
  );
};

export default TourSettings;
