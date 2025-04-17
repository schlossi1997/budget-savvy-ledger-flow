
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Define system config type
interface SystemConfig {
  companyName: string;
  primaryColor: string;
  logoUrl: string;
  smtpConfigured: boolean;
  setupComplete: boolean;
}

// Define user type
interface User {
  id: string;
  email: string;
  name?: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  systemConfig: SystemConfig | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default system config
const defaultSystemConfig: SystemConfig = {
  companyName: 'Budget Savvy',
  primaryColor: '#9b87f5',
  logoUrl: '/placeholder.svg',
  smtpConfigured: false,
  setupComplete: false
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [systemConfig, setSystemConfig] = useState<SystemConfig | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if there's a user and system config in localStorage on initial load
  useEffect(() => {
    // Check for system config
    const storedConfig = localStorage.getItem('systemConfig');
    if (storedConfig) {
      try {
        setSystemConfig(JSON.parse(storedConfig));
      } catch (e) {
        console.error('Failed to parse stored system config', e);
        setSystemConfig(defaultSystemConfig);
      }
    } else {
      setSystemConfig(defaultSystemConfig);
    }
    
    // Check for user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call to your backend
      // For this example, we're using mock authentication
      if (email === 'admin@example.com' && password === 'password') {
        // Mock user data
        const userData: User = {
          id: '1',
          email: email,
          name: 'Admin User'
        };
        
        // Save to state and localStorage
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        const companyName = systemConfig?.companyName || 'Budget Savvy';
        
        toast({
          title: `Login successful`,
          description: `Welcome back to ${companyName}!`
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try admin@example.com / password",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate('/login');
  };

  // Value provided by the context
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    systemConfig
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
