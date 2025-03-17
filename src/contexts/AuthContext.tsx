
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
    // Carrega o usuário do localStorage
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('fisioHub_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          console.log('Usuário carregado do localStorage');
        }
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error);
        localStorage.removeItem('fisioHub_user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('Processo de login iniciado para:', username);
    
    // Validação básica
    if (!username || !password) {
      console.error('Usuário ou senha está vazio');
      return false;
    }
    
    // Verifica credenciais
    if (username === 'tatyanelira' && password === 'Fisio@2000') {
      const userData = {
        id: '1',
        name: 'Dra. Tatyane Lira',
        role: 'admin' as const,
      };
      
      console.log('Login bem-sucedido, definindo dados do usuário');
      
      // Define o usuário no estado
      setUser(userData);
      
      // Salva no localStorage com tratamento de erro
      try {
        localStorage.setItem('fisioHub_user', JSON.stringify(userData));
        console.log('Dados do usuário salvos no localStorage');
      } catch (storageError) {
        console.error('Falha ao salvar usuário no localStorage:', storageError);
        // Continua mesmo se o localStorage falhar
      }
      
      return true;
    }
    
    console.log('Credenciais inválidas fornecidas');
    return false;
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('fisioHub_user');
      console.log('Usuário desconectado com sucesso');
    } catch (error) {
      console.error('Erro durante o logout:', error);
    }
  };

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
