
import React from 'react';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  name: string;
  description: string;
}

interface ServiceSelectionProps {
  services: Service[];
  selectedService: string;
  setSelectedService: (id: string) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  services,
  selectedService,
  setSelectedService
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        Selecione o Serviço
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={cn(
              'border rounded-xl p-4 cursor-pointer transition-all',
              selectedService === service.id
                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                : 'border-border hover:border-primary/30'
            )}
          >
            <div className="font-medium">{service.name}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {service.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;
