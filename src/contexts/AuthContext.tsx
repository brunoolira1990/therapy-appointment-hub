
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

// Criar o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Chave para armazenamento no localStorage
const USER_STORAGE_KEY = 'fisioHub_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage no carregamento inicial
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário do localStorage:', error);
      // Limpar localStorage corrompido
      localStorage.removeItem(USER_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Validação básica
    if (!username || !password) {
      return false;
    }
    
    // Verificar credenciais simplificadas
    if (username === 'tatyanelira' && password === 'Fisio@2000') {
      const userData: User = {
        id: '1',
        name: 'Dra. Tatyane Lira',
        role: 'admin',
      };
      
      // Definir o usuário no estado
      setUser(userData);
      
      // Salvar no localStorage
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      } catch (error) {
        console.error('Falha ao salvar usuário no localStorage:', error);
      }
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao remover usuário do localStorage:', error);
    }
  };

  // Valores expostos pelo contexto
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
