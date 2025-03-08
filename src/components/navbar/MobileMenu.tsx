import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Menu, ShieldCheck } from 'lucide-react';
import { LinkItemProps, UserProps } from './types';
import NavbarLogo from './NavbarLogo';

interface MobileMenuProps {
  links: LinkItemProps[];
  user: UserProps | null;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ links, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full text-foreground/80 hover:text-primary focus:outline-none"
        aria-label="Abrir menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="absolute top-0 right-0 mt-12 w-screen max-w-md rounded-2xl shadow-lg overflow-hidden bg-card z-50">
          <div className="p-4 flex flex-col space-y-4">
            {/* Logo */}
            <NavbarLogo />

            {/* Navigation Links */}
            <nav className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* User Info and Logout */}
            {user && (
              <div className="pt-4 border-t border-border">
                <div className="px-4 py-2 flex items-center space-x-2">
                  <ShieldCheck size={16} className="text-primary" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  aria-label="Sair"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
