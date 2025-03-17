
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  role: 'admin' | 'user';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    try {
      const storedUser = localStorage.getItem('fisioHub_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        console.log('User loaded from localStorage');
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('fisioHub_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('Login process started for:', username);
    
    try {
      // Simplified credential validation with defensive programming
      if (!username || !password) {
        console.error('Username or password is empty');
        return false;
      }
      
      // Check credentials
      if (username === 'tatyanelira' && password === 'Fisio@2000') {
        const userData = {
          id: '1',
          name: 'Dra. Tatyane Lira',
          role: 'admin' as const,
        };
        
        console.log('Login successful, setting user data');
        
        // Set user in state
        setUser(userData);
        
        // Save to localStorage with error handling
        try {
          localStorage.setItem('fisioHub_user', JSON.stringify(userData));
          console.log('User data saved to localStorage');
        } catch (storageError) {
          console.error('Failed to save user to localStorage:', storageError);
          // Continue even if localStorage fails
        }
        
        return true;
      }
      
      console.log('Invalid credentials provided');
      return false;
    } catch (error) {
      console.error('Unexpected error during login:', error);
      return false;
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('fisioHub_user');
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
