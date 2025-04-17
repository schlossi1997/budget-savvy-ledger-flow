
import React from 'react';
import { useTour, TourStep } from '@/contexts/TourContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import TourWelcome from './TourWelcome';
import TourDashboard from './TourDashboard';
import TourTransactions from './TourTransactions';
import TourBudgets from './TourBudgets';
import TourAnalysis from './TourAnalysis';
import TourSettings from './TourSettings';
import TourComplete from './TourComplete';

const TourGuide: React.FC = () => {
  const { isActive, currentStep, nextStep, prevStep, endTour } = useTour();

  if (!isActive) return null;

  const renderTourContent = () => {
    switch (currentStep) {
      case 'welcome':
        return <TourWelcome />;
      case 'dashboard':
        return <TourDashboard />;
      case 'transactions':
        return <TourTransactions />;
      case 'budgets':
        return <TourBudgets />;
      case 'analysis':
        return <TourAnalysis />;
      case 'settings':
        return <TourSettings />;
      case 'complete':
        return <TourComplete />;
      default:
        return <TourWelcome />;
    }
  };

  // Calculate step progress
  const totalSteps = 7; // Total number of steps
  const currentStepNumber = ['welcome', 'dashboard', 'transactions', 'budgets', 'analysis', 'settings', 'complete']
    .indexOf(currentStep) + 1;

  // Check if we're at the first or last step
  const isFirstStep = currentStep === 'welcome';
  const isLastStep = currentStep === 'complete';

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] animate-fade-in">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="pb-2 flex flex-row justify-between items-center">
          <CardTitle className="text-lg text-primary">
            {currentStep === 'welcome' ? 'Welcome to Budget Savvy' : 
             currentStep === 'complete' ? 'Tour Complete' : 
             `Tour: ${currentStep.charAt(0).toUpperCase() + currentStep.slice(1)}`}
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={endTour}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {renderTourContent()}
          <div className="flex justify-center mt-4 space-x-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full ${
                  i + 1 === currentStepNumber 
                    ? 'w-6 bg-primary' 
                    : 'w-2 bg-muted'
                }`} 
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={prevStep}
            disabled={isFirstStep}
            className={isFirstStep ? 'invisible' : ''}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button 
            size="sm" 
            onClick={nextStep}
          >
            {isLastStep ? 'Finish' : 'Next'}
            {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TourGuide;
