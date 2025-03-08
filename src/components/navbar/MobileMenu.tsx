
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '../Button';
import { LinkItemProps, UserProps } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: LinkItemProps[];
  isAuthenticated: boolean;
  user: UserProps | null;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  links,
  isAuthenticated,
  user,
  onLogout
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}
    >
      <div className="h-full flex flex-col pt-20 pb-6 px-6">
        {isAuthenticated && (
          <div className="py-4 border-b border-border mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
                {user?.name.split(' ')[0][0]}
              </div>
              <div>
                <div className="font-medium">{user?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user?.role === 'admin' ? 'Administradora' : 'Usuário'}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <nav className="flex-1 flex flex-col space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-foreground/90 hover:bg-secondary hover:text-primary transition-colors"
              onClick={onClose}
            >
              <span>{link.icon}</span>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto">
          {isAuthenticated ? (
            <Button
              variant="outline"
              size="lg"
              fullWidth
              icon={<LogOut size={18} />}
              iconPosition="left"
              onClick={() => {
                onLogout();
                onClose();
              }}
            >
              Sair da Conta
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="lg"
                fullWidth
                className="mb-3"
                onClick={() => {
                  navigate('/login');
                  onClose();
                }}
              >
                Entrar
              </Button>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={<ShieldCheck size={18} />}
                iconPosition="left"
                onClick={() => {
                  navigate('/login');
                  onClose();
                }}
              >
                Acessar Portal Admin
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
