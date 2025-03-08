
import React from 'react';
import { Link } from 'react-router-dom';
import { LinkItemProps } from './types';

interface NavbarLinksProps {
  links: LinkItemProps[];
  className?: string;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ links, className = '' }) => {
  return (
    <nav className={`${className}`}>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className="px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavbarLinks;
