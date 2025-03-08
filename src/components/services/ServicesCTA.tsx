
import React from 'react';
import { Button } from '@/components/ui/button';

interface ServicesCTAProps {
  onScheduleClick: () => void;
  onContactClick: () => void;
}

const ServicesCTA: React.FC<ServicesCTAProps> = ({ onScheduleClick, onContactClick }) => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container-narrow text-center">
        <h2 className="text-3xl font-bold mb-6">Pronto para Começar Seu Tratamento?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Entre em contato conosco hoje mesmo para agendar uma avaliação inicial 
          e descobrir como nossos serviços de fisioterapia podem ajudar você a 
          alcançar seus objetivos de saúde e bem-estar.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" onClick={onScheduleClick}>
            Agendar Consulta
          </Button>
          <Button variant="outline" size="lg" onClick={onContactClick}>
            Fale Conosco
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
