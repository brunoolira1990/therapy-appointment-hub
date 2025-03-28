
import React, { memo, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceDetailProps, getIconComponent } from '@/services/api';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAppointmentForm } from '@/contexts/AppointmentFormContext';

interface ServicesDetailedProps {
  services: ServiceDetailProps[];
  isLoading: boolean;
  onScheduleClick: () => void;
}

// Extract ServiceItem to a separate memoized component to prevent re-renders
const ServiceItem = memo(({ service, onSchedule }: { 
  service: ServiceDetailProps; 
  onSchedule: () => void;
}) => {
  return (
    <div 
      key={service.id}
      className={cn(
        "rounded-2xl p-8 glass-card transition-all",
        service.color
      )}
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mr-4">
              {getIconComponent(service.icon)}
            </div>
            <h3 className="text-2xl font-bold">{service.title}</h3>
          </div>
          
          <p className="text-muted-foreground mb-6">
            {service.description}
          </p>
          
          <Button 
            variant="ghost" 
            className="px-0 hover:bg-transparent hover:text-primary"
            onClick={onSchedule}
          >
            Agendar Consulta
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
        
        <div className="md:w-1/3">
          <div className="border border-primary/10 rounded-xl p-6 bg-white/80">
            <h4 className="font-semibold mb-4">Benefícios</h4>
            <ul className="space-y-2">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

ServiceItem.displayName = 'ServiceItem';

// Main component is also memoized
const ServicesDetailed: React.FC<ServicesDetailedProps> = memo(({ 
  services, 
  isLoading, 
  onScheduleClick 
}) => {
  const navigate = useNavigate();
  const { openAppointmentForm } = useAppointmentForm();
  
  const handleScheduleClick = useCallback(() => {
    openAppointmentForm();
  }, [openAppointmentForm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Conheça Nossos Serviços em Detalhes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada um de nossos serviços é cuidadosamente desenvolvido para oferecer o melhor tratamento possível, 
            com base nas melhores práticas e evidências científicas atuais.
          </p>
        </div>
        
        <div className="space-y-12">
          {services.map((service) => (
            <ServiceItem 
              key={service.id} 
              service={service} 
              onSchedule={handleScheduleClick} 
            />
          ))}
        </div>
      </div>
    </section>
  );
});

ServicesDetailed.displayName = 'ServicesDetailed';

export default ServicesDetailed;
