
import React, { memo, useCallback } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppointmentForm } from '@/contexts/AppointmentFormContext';

interface ServiceDetailContentProps {
  title: string;
  onScheduleClick: () => void;
  onContactClick: () => void;
}

const ServiceDetailContent: React.FC<ServiceDetailContentProps> = memo(({ 
  title, 
  onScheduleClick, 
  onContactClick 
}) => {
  const navigate = useNavigate();
  const { openAppointmentForm } = useAppointmentForm();
  
  const handleScheduleClick = useCallback(() => {
    openAppointmentForm();
  }, [openAppointmentForm]);
  
  const handleContactClick = useCallback(() => {
    navigate('/contact');
  }, [navigate]);
  
  return (
    <section className="py-16">
      <div className="container-narrow">
        <h2 className="text-2xl font-bold mb-6">Sobre este Serviço</h2>
        <p className="text-muted-foreground mb-6">
          A {title} oferecida pela Dra. Tatyane Prado de Lira é um tratamento 
          especializado focado em recuperação, melhorando sua qualidade de vida e 
          garantindo resultados eficazes. Com técnicas modernas e personalizadas, 
          cada sessão é adaptada às necessidades individuais.
        </p>
        
        <p className="text-muted-foreground mb-8">
          O tratamento começa com uma avaliação completa para identificar as causas 
          do problema, seguida por um plano de tratamento personalizado. Ao longo do
          processo, seu progresso é monitorado constantemente, com ajustes conforme necessário
          para garantir os melhores resultados.
        </p>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-12">
          <div>
            <p className="text-muted-foreground">
              Precisa de mais informações?
            </p>
            <h3 className="text-2xl font-bold mt-2">
              Entre em contato conosco
            </h3>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleScheduleClick}>
              Agendar Consulta
            </Button>
            <Button variant="outline" onClick={handleContactClick}>
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

ServiceDetailContent.displayName = 'ServiceDetailContent';

export default ServiceDetailContent;
