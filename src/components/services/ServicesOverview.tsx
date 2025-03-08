
import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import { ServiceDetailProps, getIconComponent } from '@/services/api';

interface ServicesOverviewProps {
  services: ServiceDetailProps[];
  isLoading: boolean;
}

const ServicesOverview: React.FC<ServicesOverviewProps> = ({ services, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description.substring(0, 120) + "..."}
              icon={getIconComponent(service.icon)}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {services.slice(3, 6).map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description.substring(0, 120) + "..."}
              icon={getIconComponent(service.icon)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
