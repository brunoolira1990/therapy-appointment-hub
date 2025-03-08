
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, Users, Clipboard, Home, LogOut, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

import NavbarLogo from './navbar/NavbarLogo';
import NavbarLinks from './navbar/NavbarLinks';
import NavbarAuthSection from './navbar/NavbarAuthSection';
import MobileMenu from './navbar/MobileMenu';
import { LinkItemProps } from './navbar/types';

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

  // Define base navigation links
  let navLinks: LinkItemProps[] = [
    { name: 'Início', path: '/', icon: <Home size={18} /> },
    { name: 'Serviços', path: '/services', icon: <Clipboard size={18} /> },
  ];

  // Add additional links for authenticated admin users
  if (isAuthenticated && user?.role === 'admin') {
    navLinks = [
      ...navLinks,
      { name: 'Pacientes', path: '/patients', icon: <Users size={18} /> },
      { name: 'Agenda', path: '/schedule', icon: <Calendar size={18} /> },
    ];
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass-nav py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Logo */}
        <NavbarLogo />

        {/* Desktop Navigation */}
        <NavbarLinks links={navLinks} className="hidden md:flex items-center space-x-1" />

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <NavbarAuthSection 
            isAuthenticated={isAuthenticated} 
            user={user} 
            onLogout={handleLogout} 
          />
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
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Navbar;
