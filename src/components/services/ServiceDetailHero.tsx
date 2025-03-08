
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceDetailProps, getIconComponent } from '@/services/api';

interface ServiceDetailHeroProps {
  service: ServiceDetailProps;
  onScheduleClick: () => void;
}

const ServiceDetailHero: React.FC<ServiceDetailHeroProps> = ({ service, onScheduleClick }) => {
  return (
    <section className={`py-16 ${service.color}`}>
      <div className="container-wide">
        <Link 
          to="/services" 
          className="inline-flex items-center mb-6 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft size={16} className="mr-2" />
          Voltar para todos os serviços
        </Link>
        
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="md:w-2/3">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mr-4">
                {getIconComponent(service.icon)}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
            </div>
            
            <p className="text-muted-foreground text-lg mb-8">
              {service.description}
            </p>
            
            <Button onClick={onScheduleClick}>
              Agendar Consulta
            </Button>
          </div>
          
          <div className="w-full md:w-1/3 rounded-xl overflow-hidden">
            <div className="border border-primary/10 rounded-xl p-6 bg-white/80">
              <h3 className="font-semibold text-xl mb-4">Benefícios</h3>
              <ul className="space-y-3">
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
    </section>
  );
};

export default ServiceDetailHero;
