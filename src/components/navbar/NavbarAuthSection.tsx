
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck } from 'lucide-react';
import Button from '../Button';
import { UserProps } from './types';

interface NavbarAuthSectionProps {
  isAuthenticated: boolean;
  user: UserProps | null;
  onLogout: () => void;
}

const NavbarAuthSection: React.FC<NavbarAuthSectionProps> = ({ 
  isAuthenticated, 
  user, 
  onLogout 
}) => {
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado e se os dados do usuário estão disponíveis
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-2">
        <div className="mr-2 flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-2">
            {user.name ? user.name.split(' ')[0].charAt(0) : '?'}
          </div>
          <span className="text-sm font-medium hidden md:block">{user.name || 'Usuário'}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<LogOut size={16} />}
          iconPosition="left"
          onClick={() => {
            console.log('Clique no botão de logout');
            onLogout();
          }}
        >
          Sair
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="sm"
      icon={<ShieldCheck size={16} />}
      iconPosition="left"
      onClick={() => {
        console.log('Redirecionando para login');
        navigate('/login');
      }}
    >
      Acessar Portal Admin
    </Button>
  );
};

export default NavbarAuthSection;
