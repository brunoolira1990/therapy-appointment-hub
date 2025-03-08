
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn('bg-secondary/50 pt-16 pb-6', className)}>
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xl">TL</span>
              </div>
              <div className="font-heading font-medium text-lg">
                <span className="text-primary">Tatyane</span>
                <span className="text-foreground">Lira</span>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Serviços profissionais de fisioterapia dedicados a ajudá-lo a restaurar o movimento, reduzir a dor e melhorar sua qualidade de vida.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={16} />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Início</Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Nossos Serviços</Link>
              </li>
              <li>
                <Link to="/patients" className="text-muted-foreground hover:text-primary transition-colors">Portal do Paciente</Link>
              </li>
              <li>
                <Link to="/schedule" className="text-muted-foreground hover:text-primary transition-colors">Agendar Consulta</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contato</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Contact Information */}
          <div>
            <h4 className="font-bold text-lg mb-6">Informações de Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Rua da Fisioterapia, 1234, Bairro Médico<br />
                  São Paulo, SP 01001-000
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-primary" />
                <a href="tel:+551123456789" className="text-muted-foreground hover:text-primary transition-colors">
                  +55 (11) 2345-6789
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-primary" />
                <a href="mailto:contato@tatyanelira.com.br" className="text-muted-foreground hover:text-primary transition-colors">
                  contato@tatyanelira.com.br
                </a>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Segunda - Sexta: 8h - 19h<br />
                  Sábado: 9h - 13h<br />
                  Domingo: Fechado
                </span>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6">Inscreva-se</h4>
            <p className="text-muted-foreground mb-4">
              Fique atualizado com nossas últimas notícias e ofertas especiais.
            </p>
            
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu endereço de e-mail"
                  className="flex-1 px-4 py-2 rounded-l-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-r-lg hover:bg-primary/90 transition-colors"
                >
                  Inscrever
                </button>
              </div>
            </form>
            
            <p className="text-xs text-muted-foreground">
              Ao se inscrever, você concorda com nossa Política de Privacidade e consente em receber atualizações de nossa empresa.
            </p>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-border my-8"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} Dra Tatyane Lira. Todos os direitos reservados.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Termos de Serviço
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
