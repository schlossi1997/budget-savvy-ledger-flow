
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import TransactionsPage from "./pages/TransactionsPage";
import BudgetsPage from "./pages/BudgetsPage";
import AnalysisPage from "./pages/AnalysisPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SetupPage from "./pages/SetupPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Protected route component that uses the auth context
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // If still loading auth state, show nothing (or could add a loading spinner)
  if (loading) {
    return null;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Check if system setup is needed
const SetupCheck = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  
  useEffect(() => {
    // Check if system is already set up
    const systemConfig = localStorage.getItem('systemConfig');
    if (systemConfig) {
      try {
        const config = JSON.parse(systemConfig);
        setIsSetupComplete(!!config.setupComplete);
      } catch (e) {
        console.error('Failed to parse system config', e);
      }
    }
    setLoading(false);
  }, []);
  
  if (loading) {
    return null; // Could show a loading spinner here
  }
  
  // If setup is not complete, redirect to setup
  if (!isSetupComplete) {
    return <Navigate to="/setup" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const [isSystemSetup, setIsSystemSetup] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if system is already set up
    const systemConfig = localStorage.getItem('systemConfig');
    if (systemConfig) {
      try {
        const config = JSON.parse(systemConfig);
        setIsSystemSetup(!!config.setupComplete);
      } catch (e) {
        console.error('Failed to parse system config', e);
        setIsSystemSetup(false);
      }
    } else {
      setIsSystemSetup(false);
    }
  }, []);
  
  // Show loading until we know if system is set up
  if (isSystemSetup === null) {
    return null; // Could show a loading spinner here
  }

  return (
    <Routes>
      {/* Setup route should only be accessible if system is not set up */}
      <Route path="/setup" element={
        isSystemSetup ? <Navigate to="/login" replace /> : <SetupPage />
      } />
      
      {/* These routes should only be accessible if system is set up */}
      <Route path="/login" element={
        !isSystemSetup ? <Navigate to="/setup" replace /> : <LoginPage />
      } />
      <Route path="/forgot-password" element={
        !isSystemSetup ? <Navigate to="/setup" replace /> : <ForgotPasswordPage />
      } />
      
      {/* Protected routes require both system setup and authentication */}
      <Route path="/" element={
        !isSystemSetup ? 
        <Navigate to="/setup" replace /> : 
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/transactions" element={
        !isSystemSetup ? 
        <Navigate to="/setup" replace /> : 
        <ProtectedRoute>
          <TransactionsPage />
        </ProtectedRoute>
      } />
      <Route path="/budgets" element={
        !isSystemSetup ? 
        <Navigate to="/setup" replace /> : 
        <ProtectedRoute>
          <BudgetsPage />
        </ProtectedRoute>
      } />
      <Route path="/analysis" element={
        !isSystemSetup ? 
        <Navigate to="/setup" replace /> : 
        <ProtectedRoute>
          <AnalysisPage />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        !isSystemSetup ? 
        <Navigate to="/setup" replace /> : 
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
