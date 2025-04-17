
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

// Define tour step type
export type TourStep = 
  | 'welcome'
  | 'dashboard'
  | 'transactions'
  | 'budgets'
  | 'analysis'
  | 'settings'
  | 'complete';

// Define context type
interface TourContextType {
  isActive: boolean;
  currentStep: TourStep;
  startTour: () => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: TourStep) => void;
}

// Create the context
const TourContext = createContext<TourContextType | undefined>(undefined);

// Tour provider component
export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState<TourStep>('welcome');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, systemConfig } = useAuth();

  // Check if tour should start after first login
  useEffect(() => {
    if (user && systemConfig?.setupComplete && !localStorage.getItem('tourCompleted')) {
      // Small delay to make sure the app is fully loaded
      const timer = setTimeout(() => {
        startTour();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [user, systemConfig]);

  // Tour step sequence
  const tourSteps: TourStep[] = [
    'welcome',
    'dashboard',
    'transactions',
    'budgets',
    'analysis',
    'settings',
    'complete'
  ];

  // Navigate to the appropriate page based on the current step
  useEffect(() => {
    if (!isActive) return;

    switch (currentStep) {
      case 'welcome':
      case 'dashboard':
        navigate('/');
        break;
      case 'transactions':
        navigate('/transactions');
        break;
      case 'budgets':
        navigate('/budgets');
        break;
      case 'analysis':
        navigate('/analysis');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'complete':
        navigate('/');
        endTour();
        break;
    }
  }, [currentStep, isActive, navigate]);

  // Start the tour
  const startTour = () => {
    setIsActive(true);
    setCurrentStep('welcome');
    toast({
      title: "Welcome to Budget Savvy",
      description: "Let's take a quick tour of your new budget management system.",
    });
  };

  // End the tour
  const endTour = () => {
    setIsActive(false);
    localStorage.setItem('tourCompleted', 'true');
    toast({
      title: "Tour completed",
      description: "You can always access help from the settings menu.",
    });
  };

  // Navigate to next step
  const nextStep = () => {
    const currentIndex = tourSteps.indexOf(currentStep);
    if (currentIndex < tourSteps.length - 1) {
      setCurrentStep(tourSteps[currentIndex + 1]);
    } else {
      endTour();
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    const currentIndex = tourSteps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(tourSteps[currentIndex - 1]);
    }
  };

  // Go to specific step
  const goToStep = (step: TourStep) => {
    if (tourSteps.includes(step)) {
      setCurrentStep(step);
    }
  };

  // Value provided by the context
  const value = {
    isActive,
    currentStep,
    startTour,
    endTour,
    nextStep,
    prevStep,
    goToStep,
  };

  return (
    <TourContext.Provider value={value}>
      {children}
    </TourContext.Provider>
  );
};

// Custom hook to use the tour context
export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};
