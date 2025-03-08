import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { scrollToBookingSection } from '@/utils/navigation';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const navigate = useNavigate();
  
  const handleBookingClick = () => {
    scrollToBookingSection(navigate);
  };

  const handleExploreServices = () => {
    navigate('/services');
  };

  return (
    <section className={cn('relative pt-32 pb-20 overflow-hidden', className)}>
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-primary/10 animate-morph"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-primary/5 animate-pulse-slow"></div>
      </div>

      <div className="container-narrow relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm animate-fade-in">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            <span>Serviços Profissionais de Fisioterapia</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight animate-slide-up text-balance">
            Restaure o Equilíbrio{' '}
            <span className="text-primary">Natural do seu Corpo</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-100 text-balance">
            Experimente tratamentos fisioterapêuticos personalizados, projetados para atender às suas necessidades específicas e ajudá-lo a alcançar o bem-estar físico ideal.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-200">
            <Button
              variant="primary"
              size="lg"
              icon={<Calendar size={18} />}
              iconPosition="left"
              onClick={handleBookingClick}
            >
              Agendar uma Consulta
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              onClick={handleExploreServices}
            >
              Explorar Serviços
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in animation-delay-300">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span>Terapeutas Certificados e Profissionais</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </div>
              <span>Planos de Tratamento Personalizados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span>Equipamentos e Técnicas Modernas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
