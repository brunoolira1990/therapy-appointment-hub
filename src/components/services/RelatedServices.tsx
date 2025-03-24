
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceDetailProps, getIconComponent } from '@/services/api';

interface RelatedServicesProps {
  relatedServices: ServiceDetailProps[];
}

// Separate RelatedServiceCard component for better performance
const RelatedServiceCard = memo(({ service, onClick }: { 
  service: ServiceDetailProps;
  onClick: (id: string) => void;
}) => {
  return (
    <div 
      className="group relative p-6 rounded-2xl glass-card hover-card overflow-hidden cursor-pointer"
      onClick={() => onClick(service.id)}
    >
      {/* Icon Container */}
      <div className="w-12 h-12 mb-6 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        {getIconComponent(service.icon)}
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
      <p className="text-muted-foreground mb-6">{service.description.substring(0, 120)}...</p>
      
      <Button 
        variant="ghost" 
        className="px-0 hover:bg-transparent hover:text-primary"
        onClick={(e) => {
          e.stopPropagation();
          onClick(service.id);
        }}
      >
        Saiba mais
        <ArrowRight size={16} className="ml-2" />
      </Button>
      
      {/* Subtle Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
});

RelatedServiceCard.displayName = 'RelatedServiceCard';

// Main component is also memoized
const RelatedServices: React.FC<RelatedServicesProps> = memo(({ relatedServices }) => {
  const navigate = useNavigate();

  const handleServiceClick = React.useCallback((id: string) => {
    navigate(`/services/${id}`);
  }, [navigate]);

  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-wide">
        <h2 className="text-2xl font-bold mb-8">Outros Serviços Relacionados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((relatedService) => (
            <RelatedServiceCard 
              key={relatedService.id}
              service={relatedService}
              onClick={handleServiceClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

RelatedServices.displayName = 'RelatedServices';

export default RelatedServices;
