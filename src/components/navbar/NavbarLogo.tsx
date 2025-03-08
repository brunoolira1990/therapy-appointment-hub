
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2"
      aria-label="Página Inicial"
    >
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
        <span className="text-white font-heading font-bold text-xl">TL</span>
      </div>
      <div className="font-heading font-medium text-lg">
        <span className="text-primary">Tatyane</span>
        <span className="text-foreground">Lira</span>
      </div>
    </Link>
  );
};

export default NavbarLogo;
