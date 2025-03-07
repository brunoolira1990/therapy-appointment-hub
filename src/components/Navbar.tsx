
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, Users, Clipboard, Home, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Você foi desconectado com sucesso');
    navigate('/');
  };

  const navLinks = [
    { name: 'Início', path: '/', icon: <Home size={18} /> },
    { name: 'Serviços', path: '/services', icon: <Clipboard size={18} /> },
  ];

  // Adiciona o link de pacientes apenas para usuários admin (doutora)
  if (isAuthenticated && user?.role === 'admin') {
    navLinks.push({ name: 'Pacientes', path: '/patients', icon: <Users size={18} /> });
  }

  navLinks.push({ name: 'Agenda', path: '/schedule', icon: <Calendar size={18} /> });

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass-nav py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="Página Inicial"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-white font-heading font-bold text-xl">FT</span>
          </div>
          <div className="font-heading font-medium text-lg">
            <span className="text-primary">Fisio</span>
            <span className="text-foreground">Hub</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <div className="mr-2 flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-2">
                  {user?.name.split(' ')[0][0]}
                </div>
                <span className="text-sm font-medium">Dra. {user?.name.split(' ')[0]}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<LogOut size={16} />}
                iconPosition="left"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              size="md"
              icon={<Calendar size={16} />}
              iconPosition="left"
              onClick={() => navigate('/login')}
            >
              Agendar Consulta
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-foreground/90 hover:bg-secondary hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
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
                  handleLogout();
                  setIsMobileMenuOpen(false);
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
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Entrar
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<Calendar size={18} />}
                  iconPosition="left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Agendar Consulta
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
