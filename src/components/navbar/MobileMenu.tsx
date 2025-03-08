
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Menu, ShieldCheck } from 'lucide-react';
import { LinkItemProps, UserProps } from './types';
import NavbarLogo from './NavbarLogo';

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
  if (!isOpen) return null;

  return (
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
              onClick={onClose} // Close menu on link click
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* User Info and Logout */}
        {isAuthenticated && user && (
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
  );
};

export default MobileMenu;
