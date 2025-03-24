
import React, { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Interface para as propriedades do ServiceCard
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  id?: string; // ID para roteamento para página de serviço individual
}

// Componente IconWrapper para encapsular o ícone
const IconWrapper = memo(({ children }: { children: React.ReactNode }) => (
  <div className="w-12 h-12 mb-6 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
    {children}
  </div>
));

IconWrapper.displayName = 'IconWrapper';

// Componente CardContent para o conteúdo do card
const CardContent = memo(({ title, description }: { title: string, description: string }) => (
  <>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground mb-6">{description}</p>
  </>
));

CardContent.displayName = 'CardContent';

// Componente GradientOverlay para o efeito de gradiente
const GradientOverlay = memo(() => (
  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
));

GradientOverlay.displayName = 'GradientOverlay';

const ServiceCard: React.FC<ServiceCardProps> = memo(({
  title,
  description,
  icon,
  className,
  id,
}) => {
  const navigate = useNavigate();
  
  const handleViewService = useCallback(() => {
    if (id) {
      navigate(`/services/${id}`);
    } else {
      navigate('/services');
    }
  }, [navigate, id]);
  
  return (
    <div 
      className={cn(
        'group relative p-6 rounded-2xl glass-card hover-card overflow-hidden cursor-pointer',
        className
      )}
      onClick={handleViewService}
    >
      <IconWrapper>{icon}</IconWrapper>
      <CardContent title={title} description={description} />
      
      <Button 
        variant="ghost" 
        className="px-0 hover:bg-transparent hover:text-primary"
        onClick={(e) => {
          e.stopPropagation();
          handleViewService();
        }}
      >
        Saiba mais
        <ArrowRight size={16} className="ml-2" />
      </Button>
      
      <GradientOverlay />
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
