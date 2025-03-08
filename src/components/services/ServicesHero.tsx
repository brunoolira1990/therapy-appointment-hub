
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppointmentForm } from '@/contexts/AppointmentFormContext';
import { scrollToBookingSection } from '@/utils/navigation';

const ServicesHero = () => {
  const navigate = useNavigate();
  const { openAppointmentForm } = useAppointmentForm();

  const handleScheduleClick = () => {
    openAppointmentForm();
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
            Nossos Serviços
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Serviços de Fisioterapia Especializados</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Oferecemos uma ampla gama de tratamentos fisioterapêuticos adaptados às suas necessidades específicas, 
            com abordagens modernas e personalizadas para sua reabilitação e bem-estar.
          </p>
          <Button onClick={handleScheduleClick}>
            Agendar Consulta
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
